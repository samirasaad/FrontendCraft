import { insight, L } from "@/content/helpers";
import type { ProductionInsights } from "@/content/tracks/_insights";

export const cssInsights: Record<string, ProductionInsights> = {
  "cascade-specificity": {
    underTheHood: insight(
      [
        L("Browsers parse stylesheets into the CSSOM, match selectors against the DOM, then resolve the cascade for each property before layout and paint.", "المتصفح بيحوّل stylesheets لـ CSSOM، ويطابق selectors مع DOM، وبعدها يحل cascade لكل property قبل layout وpaint."),
        L("A winning declaration is not permanently attached to an element: changing a class, media query, or custom property can trigger style recalculation.", "الـ declaration الفائزة مش بتتلزق في العنصر للأبد: تغيير class أو media query أو custom property ممكن يشغّل style recalculation."),
      ],
      { bullets: [L("Origin → importance → specificity → source order", "Origin → importance → specificity → source order"), L("Use DevTools Computed to see the winner", "استخدم DevTools Computed عشان تشوف الفائز")] },
    ),
    accessibility: insight(
      [L("Cascade choices affect accessibility when a more-specific visual rule accidentally removes focus outlines or hides content.", "اختيارات cascade بتأثر على الوصول لما قاعدة بصرية أعلى specificity تشيل focus outlines أو تخفي محتوى بالغلط.")],
      { bullets: [L("Test :focus-visible after component overrides", "اختبر :focus-visible بعد component overrides"), L("Do not use color as the only state signal", "متستخدمش اللون كإشارة الحالة الوحيدة")] },
    ),
    seo: insight(
      [L("CSS does not change semantic meaning, but hidden or unstable content can hurt rendering and user experience.", "CSS مش بتغير المعنى الدلالي، لكن المحتوى المخفي أو غير المستقر ممكن يضر الرندر وتجربة المستخدم.")],
      { bullets: [L("Avoid hiding primary text behind fragile selectors", "تجنب إخفاء النص الأساسي ورا selectors هشة"), L("Ship readable HTML before styling", "انشر HTML مقروء قبل الستايل")] },
    ),
  },
  "flexbox-basics": {
    underTheHood: insight(
      [
        L("Flex layout measures items, resolves flex base sizes, distributes free space, then aligns boxes along its main and cross axes.", "Flex layout بتقيس العناصر، وتحل flex base sizes، وتوزع المساحة الحرة، وبعدها تحاذي الصناديق على المحورين."),
        L("The default min-size of flex items can preserve long content and cause overflow; min-width: 0 allows a text column to shrink when appropriate.", "الـ min-size الافتراضي لعناصر flex ممكن يحافظ على محتوى طويل ويسبب overflow؛ min-width: 0 بيسمح لعمود النص يصغر لما يكون مناسب."),
      ],
      { bullets: [L("Use gap for spacing", "استخدم gap للمسافات"), L("Add min-width: 0 to shrinkable text columns", "ضيف min-width: 0 لأعمدة النص القابلة للتصغير")] },
    ),
    accessibility: insight(
      [L("Visual order can differ from DOM order with the order property, but keyboard and screen reader order follow the DOM.", "الترتيب البصري ممكن يختلف عن DOM بـ order، لكن ترتيب الكيبورد وقارئات الشاشة بيتبع DOM.")],
      { bullets: [L("Keep DOM order meaningful", "خلّي DOM order ذات معنى"), L("Do not use order to repair information hierarchy", "متستخدمش order لإصلاح hierarchy المعلومات")] },
    ),
    seo: insight(
      [L("Flex is a presentation layer. Keep the source order meaningful for crawlers, reader mode, and content extraction.", "Flex طبقة عرض. خلّي source order ذات معنى للـ crawlers وreader mode واستخراج المحتوى.")],
      { bullets: [L("Semantic HTML first, flex styling second", "HTML معنوي أولًا، flex styling ثانيًا")] },
    ),
  },
  "logical-properties": {
    underTheHood: insight(
      [
        L("Logical properties resolve against an element’s writing-mode and direction during style calculation, mapping inline and block edges to physical edges.", "Logical properties بتتحل حسب writing-mode واتجاه العنصر وقت style calculation، وبتربط حواف inline وblock بالحواف الفعلية."),
        L("This avoids maintaining mirrored left/right rules and lets a component work in an RTL subtree without a second stylesheet.", "ده بيتجنب الحفاظ على قواعد left/right معكوسة وبيخلي المكوّن يشتغل جوه RTL subtree من غير stylesheet تانية."),
      ],
      { bullets: [L("inline-start follows text direction", "inline-start بتتبع اتجاه النص"), L("block-start follows writing mode", "block-start بتتبع writing mode")] },
    ),
    accessibility: insight(
      [L("Set lang and dir in HTML so assistive technology reads content correctly; logical CSS alone cannot set language or bidirectional text behavior.", "حط lang وdir في HTML عشان التقنيات المساعدة تقرأ المحتوى صح؛ CSS المنطقية لوحدها مش بتحدد اللغة أو bidi.")],
      { bullets: [L("Test Arabic and English mixed content", "اختبر محتوى عربي وإنجليزي مخلوط"), L("Keep focus order aligned with reading order", "خلّي focus order متوافق مع ترتيب القراءة")] },
    ),
    seo: insight(
      [L("Localized pages need meaningful language and direction metadata in HTML. Logical layout helps the presentation remain correct across those locales.", "الصفحات المحلية محتاجة language وdirection metadata ذات معنى في HTML. الـ logical layout بتساعد العرض يفضل صح عبر اللغات.")],
      { bullets: [L("Use hreflang and lang where applicable", "استخدم hreflang وlang لما ينفع"), L("Avoid separate mirrored markup", "تجنب markup منفصلة معكوسة")] },
    ),
  },
};
