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
  var totalFiles = 0;
  var pdfFiles = 0;
  var imageFiles = 0;
  var totalSessions = 0;
  var magicButtonClicks = 0;
  var sharePopupTriggers = 0;

  let activityLog = List.empty<ToolEvent>();
  let maxActivityLogSize = 50;

  let fileTimestamps = List.empty<Time.Time>();

  let toolToggles = Map.empty<Text, Bool>();

  var adminPassword : Text = "admin123";

  let userProfiles = Map.empty<Principal, UserProfile>();

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

  public query func verifyAdminPassword(password : Text) : async Bool {
    password == adminPassword;
  };

  public shared func updateAdminPassword(currentPassword : Text, newPassword : Text) : async Bool {
    if (currentPassword != adminPassword) {
      return false;
    };
    adminPassword := newPassword;
    true;
  };

  public shared func recordFile() : async Nat {
    let previous = totalFiles;
    totalFiles += 1;
    fileTimestamps.add(Time.now());
    previous;
  };

  public shared func recordFileTyped(fileType : Text) : async Nat {
    let previous = totalFiles;
    totalFiles += 1;
    if (fileType == "pdf") {
      pdfFiles += 1;
    } else {
      imageFiles += 1;
    };
    fileTimestamps.add(Time.now());
    previous;
  };

  public shared func recordSession() : async Nat {
    let previous = totalSessions;
    totalSessions += 1;
    previous;
  };

  public shared func recordMagicButtonClick() : async Nat {
    let previous = magicButtonClicks;
    magicButtonClicks += 1;
    previous;
  };

  public shared func recordSharePopup() : async Nat {
    let previous = sharePopupTriggers;
    sharePopupTriggers += 1;
    previous;
  };

  public shared func recordToolUsage(toolName : Text) : async Nat {
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

  public shared func setToolEnabled(toolId : Text, enabled : Bool) : async () {
    toolToggles.add(toolId, enabled);
  };

  public query func getToolEnabled(toolId : Text) : async Bool {
    switch (toolToggles.get(toolId)) {
      case (null) { true };
      case (?v) { v };
    };
  };

  public query func getAllToolStates() : async [(Text, Bool)] {
    toolToggles.toArray();
  };

  public query func getHourlyFileCount() : async Nat {
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

  public query func getExtendedStats() : async ExtendedStats {
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

  public query func getPlatformStats() : async PlatformStats {
    {
      totalFiles;
      totalSessions;
      toolUsage = toolUsage.toArray();
      recentActivity = activityLog.toArray().sort(ToolEvent.compareByTimestamp);
    };
  };

  public query func getToolStats() : async [(Text, Nat)] {
    toolUsage.toArray();
  };

  public query func getRecentActivity() : async [ToolEvent] {
    activityLog.toArray().sort(ToolEvent.compareByTimestamp);
  };

  public query func getTotalFiles() : async Nat {
    totalFiles;
  };

  public query func getTotalSessions() : async Nat {
    totalSessions;
  };

  public query func getToolCount(toolName : Text) : async Nat {
    switch (toolUsage.get(toolName)) {
      case (null) { 0 };
      case (?count) { count };
    };
  };

  public query func toolExists(toolName : Text) : async Bool {
    toolUsage.containsKey(toolName);
  };
};
