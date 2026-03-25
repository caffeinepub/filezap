import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import List "mo:core/List";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Use migration function in new actor

actor {
  type PlatformStats = {
    totalFiles : Nat;
    totalSessions : Nat;
    toolUsage : [(Text, Nat)];
    recentActivity : [ToolEvent];
  };

  type ExtendedStats = {
    totalFiles : Nat;
    pdfFiles : Nat;
    imageFiles : Nat;
    totalSessions : Nat;
    magicButtonClicks : Nat;
    sharePopupTriggers : Nat;
    toolUsage : [(Text, Nat)];
    hourlyFileCount : Nat;
  };

  type ToolEvent = {
    toolName : Text;
    timestamp : Time.Time;
  };

  type UserProfile = {
    name : Text;
  };

  module ToolEvent {
    public func compareByTimestamp(e1 : ToolEvent, e2 : ToolEvent) : Order.Order {
      Int.compare(e2.timestamp, e1.timestamp);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let toolUsage = Map.empty<Text, Nat>();
  stable var totalFiles = 0;
  stable var pdfFiles = 0;
  stable var imageFiles = 0;
  stable var totalSessions = 0;
  stable var magicButtonClicks = 0;
  stable var sharePopupTriggers = 0;

  let activityLog = List.empty<ToolEvent>();
  let maxActivityLogSize = 50;

  let fileTimestamps = List.empty<Time.Time>();

  let toolToggles = Map.empty<Text, Bool>();

  // Force reset to admin123 on every upgrade so user can always log in.
  // Once logged in, use the Change Password feature to set a new one.
  stable var adminPassword : Text = "admin123";

  system func postupgrade() {
    adminPassword := "admin123";
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // New referral tracking functionality
  var referralCounts = Map.empty<Text, Nat>();

  public shared ({ caller }) func recordReferral(code : Text) : async Nat {
    if (code.size() > 100) {
      Runtime.trap("Referral code too long");
    };
    let newCount = switch (referralCounts.get(code)) {
      case (null) { 1 };
      case (?count) { count + 1 };
    };
    referralCounts.add(code, newCount);
    newCount;
  };

  public query ({ caller }) func getReferralCount(code : Text) : async Nat {
    switch (referralCounts.get(code)) {
      case (null) { 0 };
      case (?count) { count };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func verifyAdminPassword(password : Text) : async Bool {
    password == adminPassword;
  };

  public shared ({ caller }) func updateAdminPassword(currentPassword : Text, newPassword : Text) : async Bool {
    if (currentPassword != adminPassword) {
      return false;
    };
    adminPassword := newPassword;
    true;
  };

  public shared ({ caller }) func recordFile() : async Nat {
    totalFiles += 1;
    fileTimestamps.add(Time.now());
    totalFiles - 1;
  };

  public shared ({ caller }) func recordFileTyped(fileType : Text) : async Nat {
    totalFiles += 1;
    if (fileType == "pdf") {
      pdfFiles += 1;
    } else {
      imageFiles += 1;
    };
    fileTimestamps.add(Time.now());
    totalFiles - 1;
  };

  public shared ({ caller }) func recordSession() : async Nat {
    totalSessions += 1;
    totalSessions - 1;
  };

  public shared ({ caller }) func recordMagicButtonClick() : async Nat {
    magicButtonClicks += 1;
    magicButtonClicks - 1;
  };

  public shared ({ caller }) func recordSharePopup() : async Nat {
    sharePopupTriggers += 1;
    sharePopupTriggers - 1;
  };

  public shared ({ caller }) func recordToolUsage(toolName : Text) : async Nat {
    let prevCount = switch (toolUsage.get(toolName)) {
      case (null) { 0 };
      case (?count) { count };
    };
    toolUsage.add(toolName, prevCount + 1);

    let newEvent : ToolEvent = {
      toolName;
      timestamp = Time.now();
    };
    activityLog.add(newEvent);

    while (activityLog.size() > maxActivityLogSize) {
      ignore activityLog.removeLast();
    };

    prevCount + 1;
  };

  public shared ({ caller }) func setToolEnabled(toolId : Text, enabled : Bool) : async () {
    toolToggles.add(toolId, enabled);
  };

  public query ({ caller }) func getToolEnabled(toolId : Text) : async Bool {
    switch (toolToggles.get(toolId)) {
      case (null) { true };
      case (?v) { v };
    };
  };

  public query ({ caller }) func getAllToolStates() : async [(Text, Bool)] {
    toolToggles.toArray();
  };

  public query ({ caller }) func getHourlyFileCount() : async Nat {
    let now = Time.now();
    let oneHourAgo = now - 3_600_000_000_000;
    var count = 0;
    for (ts in fileTimestamps.toArray().vals()) {
      if (ts >= oneHourAgo) {
        count += 1;
      };
    };
    count;
  };

  public query ({ caller }) func getExtendedStats() : async ExtendedStats {
    let now = Time.now();
    let oneHourAgo = now - 3_600_000_000_000;
    var hourlyCount = 0;
    for (ts in fileTimestamps.toArray().vals()) {
      if (ts >= oneHourAgo) {
        hourlyCount += 1;
      };
    };
    {
      totalFiles;
      pdfFiles;
      imageFiles;
      totalSessions;
      magicButtonClicks;
      sharePopupTriggers;
      toolUsage = toolUsage.toArray();
      hourlyFileCount = hourlyCount;
    };
  };

  public query ({ caller }) func getPlatformStats() : async PlatformStats {
    {
      totalFiles;
      totalSessions;
      toolUsage = toolUsage.toArray();
      recentActivity = activityLog.toArray().sort(ToolEvent.compareByTimestamp);
    };
  };

  public query ({ caller }) func getToolStats() : async [(Text, Nat)] {
    toolUsage.toArray();
  };

  public query ({ caller }) func getRecentActivity() : async [ToolEvent] {
    activityLog.toArray().sort(ToolEvent.compareByTimestamp);
  };

  public query ({ caller }) func getTotalFiles() : async Nat {
    totalFiles;
  };

  public query ({ caller }) func getTotalSessions() : async Nat {
    totalSessions;
  };

  public query ({ caller }) func getToolCount(toolName : Text) : async Nat {
    switch (toolUsage.get(toolName)) {
      case (null) { 0 };
      case (?count) { count };
    };
  };

  public query ({ caller }) func toolExists(toolName : Text) : async Bool {
    toolUsage.containsKey(toolName);
  };
};
