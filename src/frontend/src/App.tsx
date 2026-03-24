import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import { useActor } from "./hooks/useActor";

const HomePage = lazy(() => import("./pages/HomePage"));
const CompressPdf = lazy(() => import("./pages/CompressPdf"));
const MergePdf = lazy(() => import("./pages/MergePdf"));
const SplitPdf = lazy(() => import("./pages/SplitPdf"));
const PdfToWord = lazy(() => import("./pages/PdfToWord"));
const PdfToJpg = lazy(() => import("./pages/PdfToJpg"));
const AddWatermark = lazy(() => import("./pages/AddWatermark"));
const CompressImage = lazy(() => import("./pages/CompressImage"));
const ResizeImage = lazy(() => import("./pages/ResizeImage"));
const ConvertImage = lazy(() => import("./pages/ConvertImage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading tool...</p>
    </div>
  </div>
);

const wrap = (Component: React.ComponentType) => () => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

function SessionTracker() {
  const { actor } = useActor();
  useEffect(() => {
    const count = Number.parseInt(
      localStorage.getItem("filezap_session_count") || "0",
    );
    localStorage.setItem("filezap_session_count", String(count + 1));
    actor?.recordSession().catch(() => {});
  }, [actor]);
  return null;
}

function WelcomeBackBanner() {
  const lastTool = localStorage.getItem("filezap_last_tool");
  const lastToolName = localStorage.getItem("filezap_last_tool_name");
  const lastToolPath = localStorage.getItem("filezap_last_tool_path");
  if (!lastTool || !lastToolName || !lastToolPath) return null;
  return (
    <div className="bg-secondary border-b border-border py-2 px-4 text-sm text-center">
      <span className="text-muted-foreground">Welcome back! </span>
      <Link
        to={lastToolPath as "/"}
        className="text-accent font-medium hover:underline"
      >
        Continue with {lastToolName} →
      </Link>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <WelcomeBackBanner />
      <SessionTracker />
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: wrap(HomePage),
});
const compressPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compress-pdf",
  component: wrap(CompressPdf),
});
const mergePdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/merge-pdf",
  component: wrap(MergePdf),
});
const splitPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/split-pdf",
  component: wrap(SplitPdf),
});
const pdfToWordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf-to-word",
  component: wrap(PdfToWord),
});
const pdfToJpgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf-to-jpg",
  component: wrap(PdfToJpg),
});
const addWatermarkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-watermark",
  component: wrap(AddWatermark),
});
const compressImageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compress-image",
  component: wrap(CompressImage),
});
const resizeImageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resize-image",
  component: wrap(ResizeImage),
});
const convertImageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/convert-image",
  component: wrap(ConvertImage),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: wrap(AdminDashboard),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  compressPdfRoute,
  mergePdfRoute,
  splitPdfRoute,
  pdfToWordRoute,
  pdfToJpgRoute,
  addWatermarkRoute,
  compressImageRoute,
  resizeImageRoute,
  convertImageRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
