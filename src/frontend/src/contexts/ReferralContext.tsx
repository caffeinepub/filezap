import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const REF_CODE_KEY = "bolttools_ref_code";
const REFERRED_BY_KEY = "bolttools_referred_by";

function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BT";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

interface ReferralContextValue {
  myRefCode: string;
  myRefLink: string;
  referralVisits: number;
}

const ReferralContext = createContext<ReferralContextValue>({
  myRefCode: "",
  myRefLink: "",
  referralVisits: 0,
});

function ReferralSync({ myRefCode }: { myRefCode: string }) {
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (!actor || isFetching || !myRefCode) return;

    // Check URL for incoming referral
    const params = new URLSearchParams(window.location.search);
    const incomingRef = params.get("ref");
    if (incomingRef && incomingRef !== myRefCode) {
      const alreadyTracked = localStorage.getItem(REFERRED_BY_KEY);
      if (!alreadyTracked) {
        localStorage.setItem(REFERRED_BY_KEY, incomingRef);
        actor.recordReferral(incomingRef).catch(() => {});
        toast.success(
          "You were referred by a friend! Welcome to BoltTools.app",
          { duration: 4000 },
        );
      }
    }
  }, [actor, isFetching, myRefCode]);

  return null;
}

export function ReferralProvider({ children }: { children: React.ReactNode }) {
  const [myRefCode, setMyRefCode] = useState<string>("");
  const [referralVisits, setReferralVisits] = useState(0);
  const { actor, isFetching } = useActor();

  useEffect(() => {
    let code = localStorage.getItem(REF_CODE_KEY);
    if (!code) {
      code = generateCode();
      localStorage.setItem(REF_CODE_KEY, code);
    }
    setMyRefCode(code);
  }, []);

  useEffect(() => {
    if (!actor || isFetching || !myRefCode) return;
    actor
      .getReferralCount(myRefCode)
      .then((count) => setReferralVisits(Number(count)))
      .catch(() => {});
  }, [actor, isFetching, myRefCode]);

  const myRefLink = myRefCode
    ? `${window.location.origin}?ref=${myRefCode}`
    : window.location.origin;

  return (
    <ReferralContext.Provider value={{ myRefCode, myRefLink, referralVisits }}>
      <ReferralSync myRefCode={myRefCode} />
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  return useContext(ReferralContext);
}
