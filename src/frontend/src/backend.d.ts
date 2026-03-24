import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ToolEvent {
    timestamp: Time;
    toolName: string;
}
export type Time = bigint;
export interface PlatformStats {
    totalFiles: bigint;
    recentActivity: Array<ToolEvent>;
    totalSessions: bigint;
    toolUsage: Array<[string, bigint]>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPlatformStats(): Promise<PlatformStats>;
    getRecentActivity(): Promise<Array<ToolEvent>>;
    getToolCount(toolName: string): Promise<bigint>;
    getToolStats(): Promise<Array<[string, bigint]>>;
    getTotalFiles(): Promise<bigint>;
    getTotalSessions(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordFile(): Promise<bigint>;
    recordSession(): Promise<bigint>;
    recordToolUsage(toolName: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    toolExists(toolName: string): Promise<boolean>;
    updateAdminPassword(currentPassword: string, newPassword: string): Promise<boolean>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
