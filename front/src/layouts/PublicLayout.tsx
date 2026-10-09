import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PublicHeader } from '../components/layout/PublicHeader';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { RouteFallback } from '../components/ui/RouteFallback';
import { api, publicApiUrl } from '../api';
import { useApiQuery } from '../hooks/useApiQuery';

/** Footer placement: an admin-uploaded video announcement above the footer columns (hidden when none). */
const FooterAdVideo: React.FC = () => {
  const feed = useApiQuery((signal) => api.announcements.publicList('footer', signal), []);
  const ad = feed.data?.[0];
  if (!ad?.video_path) return null;
  return (
    <div className="mb-8">
      <video
        src={publicApiUrl(ad.video_path)}
        autoPlay
        muted
        loop
        playsInline
        aria-label={ad.title}
        className="w-full rounded-2xl border border-[#E6EAF0] bg-[#0B1220]"
      />
    </div>
  );
};

/**
 * Layout of the public marketing pages (the landing page and advertisements). It has no
 * sidebar and needs no session; the portals use AppLayout behind RequireAuth.
 */
export const PublicLayout: React.FC = () => (
  <div className="min-h-screen bg-[#F7F9FC] flex flex-col text-right" dir="rtl">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-[#003E82] focus:shadow-lg"
    >
      تخطَّ إلى المحتوى
    </a>
    <PublicHeader />
    <main id="main-content" className="flex-1 w-full py-4 sm:py-6 lg:py-8">
      <ErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
    <footer className="border-t border-[#E6EAF0] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        <FooterAdVideo />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          <div className="col-span-2">
            <img src="/jahiz-logo-vector.svg" alt="جاهز" className="h-10 w-auto object-contain" />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#667085]">
              المنصة الوطنية لربط المنشآت الصناعية بمزودي حلول الأتمتة والذكاء الاصطناعي.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#FFF3E6] px-3 py-1 text-[11px] font-black text-[#003E82]">
              جاهز تطوّر مصنعك؟
            </p>
          </div>
          <nav aria-label="البوابات">
            <h3 className="text-xs font-black text-[#172033]">البوابات</h3>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/register/factory" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">تسجيل منشأة صناعية</Link></li>
              <li><Link to="/register/provider" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">تسجيل مزود خدمة</Link></li>
              <li><Link to="/login" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">تسجيل الدخول</Link></li>
            </ul>
          </nav>
          <nav aria-label="المنصة">
            <h3 className="text-xs font-black text-[#172033]">المنصة</h3>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/factory/assessment" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">تقييم الجاهزية الرقمية</Link></li>
              <li><Link to="/factory/catalog" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">كتالوج الخدمات</Link></li>
              <li><Link to="/forgot-password" className="text-xs text-[#667085] transition-colors hover:text-[#0754A6]">استعادة كلمة المرور</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#E6EAF0] pt-5 sm:flex-row">
          <p className="text-[11px] text-[#98A2B3]">منصة جاهز — جميع الحقوق محفوظة.</p>
          <p className="text-[11px] text-[#98A2B3]">بإشراف مركز تحديث الصناعة (IMC)</p>
        </div>
      </div>
    </footer>
  </div>
);
