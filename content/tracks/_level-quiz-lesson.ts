import { L } from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import type { LevelQuizDefinition } from "@/lib/level-quiz/types";
import type { Tier } from "@/lib/types";
import { LEVEL_QUIZ_VISUALIZER_ID } from "@/lib/visualizer-ids";

export function levelQuizLesson(
  id: string,
  slug: string,
  tier: Tier,
  quiz: LevelQuizDefinition,
): LessonDraft {
  return {
    id,
    order: 0,
    slug,
    tier,
    readMinutes: 10,
    icon: "Trophy",
    visualizer: LEVEL_QUIZ_VISUALIZER_ID,
    content: {
      title: quiz.title,
      summary: L(
        "End-of-level checkpoint — drag, code, spot bugs, and real-world scenarios. Pass to lock in this tier.",
        "اختبار نهاية المستوى — سحب وكود واكتشاف أخطاء وسيناريوهات واقعية. اجتزه لتثبيت هذا المستوى.",
      ),
      paragraphs: [
        L(
          "Work through every question at your own pace. Use hints when you are stuck, then read the explanations to cement the pattern.",
          "أكمل كل سؤال براحتك. استخدم التلميحات لو علقت، ثم اقرأ الشروحات لتثبيت النمط.",
        ),
      ],
      keyPoints: [
        L("10 interactive challenges per level", "١٠ تحديات تفاعلية لكل مستوى"),
        L("Hints and explanations after each try", "تلميحات وشروحات بعد كل محاولة"),
        L("Score 80% or higher to mark complete", "احصل على ٨٠٪ أو أعلى لتعليم الدرس مكتملًا"),
      ],
      visualHint: L("Level checkpoint", "اختبار المستوى"),
      levelQuiz: quiz,
    },
  };
}
