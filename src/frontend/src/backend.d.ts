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
export interface ExtendedStats {
    totalFiles: bigint;
    imageFiles: bigint;
    hourlyFileCount: bigint;
    magicButtonClicks: bigint;
    pdfFiles: bigint;
    totalSessions: bigint;
    sharePopupTriggers: bigint;
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
    getAllToolStates(): Promise<Array<[string, boolean]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getExtendedStats(): Promise<ExtendedStats>;
    getHourlyFileCount(): Promise<bigint>;
    getPlatformStats(): Promise<PlatformStats>;
    getRecentActivity(): Promise<Array<ToolEvent>>;
    getReferralCount(code: string): Promise<bigint>;
    getToolCount(toolName: string): Promise<bigint>;
    getToolEnabled(toolId: string): Promise<boolean>;
    getToolStats(): Promise<Array<[string, bigint]>>;
    getTotalFiles(): Promise<bigint>;
    getTotalSessions(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordFile(): Promise<bigint>;
    recordFileTyped(fileType: string): Promise<bigint>;
    recordMagicButtonClick(): Promise<bigint>;
    recordReferral(code: string): Promise<bigint>;
    recordSession(): Promise<bigint>;
    recordSharePopup(): Promise<bigint>;
    recordToolUsage(toolName: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setToolEnabled(toolId: string, enabled: boolean): Promise<void>;
    toolExists(toolName: string): Promise<boolean>;
    updateAdminPassword(currentPassword: string, newPassword: string): Promise<boolean>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
