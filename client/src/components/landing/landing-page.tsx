import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustBandSection } from "@/components/landing/trust-band-section";
import { AboutSection } from "@/components/landing/about-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DemoShowcaseSection } from "@/components/landing/demo-showcase";
import { FeaturesSection } from "@/components/landing/features-section";
import { JourneySection } from "@/components/landing/journey-section";
import { GrowthLadderSection } from "@/components/landing/growth-ladder-section";
import { MockupsSection } from "@/components/landing/mockups-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ClosingCtaSection } from "@/components/landing/closing-cta-section";
import { BrandMark } from "@/components/brand/brand-mark";
import { getSessionDashboardHref } from "@/lib/auth/dashboard-href";
import { signOutAction } from "@/app/actions/auth";

interface LandingPageProps {
  user: User | null;
  dashboardHref: string | null;
}

export async function LandingPage({ user, dashboardHref }: LandingPageProps) {
  const t = await getTranslations("Landing");
  const tc = await getTranslations("Common");

  return (
    <div className="weave-bg flex min-h-full flex-col">
      <LandingNav signedIn={!!user} dashboardHref={dashboardHref} />

      <main id="main-content" className="w-full flex-1 flex flex-col">
        {/* First Viewport Fold: Hero (Built for Filipino Farmers) + Trust Band (Sober Credible Proof) */}
        <div className="w-full min-h-[calc(100vh-4.5rem)] flex flex-col justify-between border-b border-border-brand/30 bg-bg-brand/20">
          <div className="flex-1 flex items-center py-8">
            <div className="mx-auto max-w-5xl w-full px-6">
              <HeroSection />
            </div>
          </div>
          <div className="bg-surface-brand py-6 border-t border-border-brand/30">
            <div className="mx-auto max-w-5xl w-full px-6">
              <TrustBandSection />
            </div>
          </div>
        </div>

        {/* Section 3: About */}
        <div className="w-full py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <AboutSection />
          </div>
        </div>

        {/* Section 4: How It Works */}
        <div className="w-full bg-surface-brand/60 py-16 sm:py-24 border-y border-border-brand/20">
          <div className="mx-auto max-w-5xl px-6">
            <HowItWorksSection />
          </div>
        </div>

        {/* Section 5: Demo Showcase */}
        <div className="w-full py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <DemoShowcaseSection />
          </div>
        </div>

        {/* Section 6: Features */}
        <div className="w-full bg-surface-brand/45 py-16 sm:py-24 border-y border-border-brand/20">
          <div className="mx-auto max-w-5xl px-6">
            <FeaturesSection />
          </div>
        </div>

        {/* Section 7: Journey */}
        <div className="w-full py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <JourneySection />
          </div>
        </div>

        {/* Section 8: Growth Ladder */}
        <div className="w-full bg-surface-brand/40 py-16 sm:py-24 border-y border-border-brand/20">
          <div className="mx-auto max-w-5xl px-6">
            <GrowthLadderSection />
          </div>
        </div>

        {/* Section 9: Mockups */}
        <div className="w-full py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <MockupsSection />
          </div>
        </div>

        {/* Section 10: Tech Stack */}
        <div className="w-full bg-surface-brand/50 py-16 sm:py-24 border-y border-border-brand/20">
          <div className="mx-auto max-w-5xl px-6">
            <TechStackSection />
          </div>
        </div>

        {/* Section 11: FAQ */}
        <div className="w-full py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <FaqSection />
          </div>
        </div>

        {/* Section 12: Closing CTA & Waitlist */}
        <div className="w-full bg-surface-brand/40 py-16 sm:py-24 border-t border-border-brand/20">
          <div className="mx-auto max-w-5xl px-6">
            <ClosingCtaSection />
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-border-brand bg-surface-brand/80">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-sm flex-col gap-2">
            <span className="brand-lockup">
              <BrandMark className="brand-lockup-mark" aria-hidden="true" />
              <span className="brand-lockup-word">{tc("appName")}</span>
            </span>
            <p className="text-sm leading-relaxed text-text-muted-brand">
              {t("tagline")} — {t("heroTaglineSub")}
            </p>
            <p className="text-xs text-text-muted-brand">{t("footerPrivacy")}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm">
            {user ? (
              <form action={signOutAction}>
                <button type="submit" className="btn btn-ghost btn-sm">
                  {tc("signOut")}
                </button>
              </form>
            ) : (
              <Link href="/login" className="btn btn-ghost btn-sm">
                {t("footerSignUp")}
              </Link>
            )}
            <Link href="/courses" className="btn btn-ghost btn-sm">
              {t("ctaBrowse")}
            </Link>
            <Link href="/teacher" prefetch={false} className="btn btn-ghost btn-sm">
              {t("ctaTeacher")}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Resolve dashboard link for signed-in users. */
export async function resolveDashboardHref(): Promise<{
  user: User | null;
  dashboardHref: string | null;
}> {
  return getSessionDashboardHref();
}
