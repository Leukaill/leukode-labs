import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/hooks/use-translation";
import Home from "@/pages/home";
import PackageDetail from "@/pages/package-detail";
import PortfolioShowcase from "@/pages/portfolio-showcase";
import ProjectDetail from "@/pages/project-detail";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/package/:packageId" component={PackageDetail} />
      <Route path="/portfolio" component={PortfolioShowcase} />
      <Route path="/project/:projectId" component={ProjectDetail} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
