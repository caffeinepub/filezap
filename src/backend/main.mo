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
  var totalSessions = 0;

  let activityLog = List.empty<ToolEvent>();
  let maxActivityLogSize = 50;

  var adminPassword : Text = "89516admin@#@@";

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
    previous;
  };

  public shared func recordSession() : async Nat {
    let previous = totalSessions;
    totalSessions += 1;
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
