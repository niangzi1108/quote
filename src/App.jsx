import React, { useEffect, useMemo, useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  LayoutList,
  Link2,
  Menu,
  Receipt,
  Server,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { FeeBreakdownChart } from "@/components/FeeBreakdownChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  formatAmount,
  importantNotes,
  quoteData,
  TIER_BUTTON_META,
  TIER_KEYS,
} from "@/data/quoteData";
import { cn } from "@/lib/utils";

function statusMeta(includeStatus) {
  const s = String(includeStatus ?? "");
  if (s.includes("部分")) {
    return {
      Icon: AlertTriangle,
      pill: "border-amber-200 bg-amber-50 text-amber-800",
      wrap: "text-amber-600",
    };
  }
  if (s.includes("包含")) {
    return {
      Icon: CheckCircle2,
      pill: "border-emerald-200 bg-emerald-50 text-emerald-800",
      wrap: "text-emerald-600",
    };
  }
  return {
    Icon: CheckCircle2,
    pill: "border-slate-200 bg-slate-50 text-slate-700",
    wrap: "text-slate-600",
  };
}

function statusLabel(includeStatus) {
  // 保持纯文本状态标签
  return String(includeStatus ?? "").replace(/\s+/g, " ").trim();
}

function KVGrid({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it, idx) => (
        <Card key={idx} className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-xs font-bold text-muted-foreground">{it.label}</div>
            <div className="mt-1 text-sm font-extrabold text-slate-900 leading-relaxed">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeaturesGrid({ features }) {
  return (
    <div className="grid gap-3">
      {features.map((f, idx) => {
        const st = statusMeta(f.includeStatus);
        const Icon = st.Icon;
        return (
          <Card key={idx} className="border-slate-200 shadow-sm">
            <div className="md:hidden p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                      <Icon className={cn("h-5 w-5", st.wrap)} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-extrabold text-slate-900">{f.module}</div>
                      <Badge variant="outline" className={cn("mt-1 rounded-full border font-bold", st.pill)}>
                        {statusLabel(f.includeStatus) || "—"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-bold text-slate-800">{f.customerNeed}</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.implementation}</div>
                  {f.remark ? <div className="mt-2 text-xs text-slate-500">{f.remark}</div> : null}
                </div>
              </div>
            </div>

            <div className="hidden md:block p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                      <Icon className={cn("h-5 w-5", st.wrap)} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-extrabold text-slate-900">{f.module}</div>
                      <Badge variant="outline" className={cn("mt-1 inline-flex w-fit rounded-full border font-bold", st.pill)}>
                        {statusLabel(f.includeStatus) || "—"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-bold text-slate-800">{f.customerNeed}</div>
                  <div className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">{f.implementation}</div>
                  {f.remark ? <div className="mt-1 text-[11px] leading-relaxed text-slate-500 line-clamp-1">{f.remark}</div> : null}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function FeeCards({ feeItems }) {
  return (
    <div className="grid gap-3">
      {feeItems.map((it, idx) => {
        const isTotal = it.category === "合计";
        const amountText = typeof it.amount === "number" ? formatAmount(it.amount) : String(it.amount ?? "");
        return (
          <Card
            key={idx}
            className={cn(
              "shadow-sm",
              isTotal ? "border-brand-600 bg-gradient-to-b from-brand-50 to-card" : "border-slate-200"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className={cn("text-sm font-extrabold", isTotal ? "text-slate-900" : "text-slate-800")}>{it.category}</div>
                  {it.content ? <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.content}</div> : null}
                </div>
                <div className={cn("text-sm font-black whitespace-nowrap", isTotal ? "text-brand-700" : "text-slate-900")}>{amountText}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ThirdPartyCards({ items }) {
  return (
    <div className="grid gap-3">
      {items.map((it, idx) => {
        const isOptional = String(it.type ?? "").includes("可选");
        const isRecommended = String(it.desc ?? "").includes("建议");
        const pillClass = isOptional
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : isRecommended
            ? "border-slate-200 bg-slate-50 text-slate-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-800";
        const dotClass = isOptional ? "bg-amber-500" : isRecommended ? "bg-slate-400" : "bg-emerald-500";
        const typeLabel = String(it.type ?? "").replace("第三方费用", "第三方");
        return (
          <Card key={idx} className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", dotClass)} />
                    <div className="text-sm font-extrabold text-slate-900">{it.project}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className={cn("rounded-full font-bold", pillClass)}>
                      {typeLabel}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{it.desc || ""}</div>
                </div>
                <div className="text-sm font-black text-slate-900 whitespace-nowrap">{it.amountText ?? ""}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function PaymentsCards({ payments }) {
  return (
    <div className="grid gap-3">
      {payments.map((p, idx) => {
        const amountText = typeof p.amount === "number" ? formatAmount(p.amount) : String(p.amount ?? "");
        return (
          <Card key={idx} className="relative border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-slate-900">{p.stage}</div>
                  <Badge variant="outline" className="mt-1 rounded-full border-brand-200 bg-brand-50 font-bold text-brand-700">
                    {p.ratioText}
                  </Badge>
                  <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</div>
                </div>
                <div className="text-sm font-black text-slate-900 whitespace-nowrap">{amountText}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function OlList({ items }) {
  return (
    <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-slate-700">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  );
}

const NAV_LINKS = [
  { href: "#part-1", short: "一、项目", full: "一、项目基本信息" },
  { href: "#part-2", short: "二、老师端", full: "二、老师端需求拆解" },
  { href: "#part-3", short: "三、学生端", full: "三、学生端需求拆解" },
  { href: "#part-4", short: "四、后台", full: "四、后台管理系统需求拆解" },
  { href: "#part-5", short: "五、费用", full: "五、费用明细" },
  { href: "#part-6", short: "六、第三方", full: "六、第三方费用" },
  { href: "#part-7", short: "七、付款", full: "七、付款方式" },
  { href: "#part-8", short: "八、说明", full: "八、重要说明" },
  { href: "#part-9", short: "九、交付", full: "九、交付标准" },
];

export default function App() {
  const [tierKey, setTierKey] = useState("高级完整版_52000");
  const [menuOpen, setMenuOpen] = useState(false);

  const data = useMemo(() => quoteData[tierKey], [tierKey]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid gap-3 md:grid-cols-[0.95fr_1.05fr] items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 ring-1 ring-brand-200">
                  <DocumentTextIcon className="h-6 w-6" aria-hidden />
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">教育类双端小程序开发报价单</h1>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">（微信云开发 · 需求拆解版）</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="inline-flex items-center gap-1 border-brand-200 bg-brand-50 font-semibold text-brand-700">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                  自适应 PC/手机
                </Badge>
                <Badge variant="outline" className="inline-flex items-center gap-1 border-brand-200 bg-brand-50 font-semibold text-brand-700">
                  <Receipt className="h-3.5 w-3.5" aria-hidden />
                  费用明细
                </Badge>
                <Badge variant="outline" className="inline-flex items-center gap-1 border-brand-200 bg-brand-50 font-semibold text-brand-700">
                  <CreditCard className="h-3.5 w-3.5" aria-hidden />
                  阶段付款
                </Badge>
              </div>
            </div>

            <aside className="w-full md:text-right">
              <Card className="border-brand-200 shadow-sm md:border-0 md:bg-transparent md:shadow-none">
                <CardContent className="space-y-4 p-5 md:p-0">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground">项目总报价</div>
                    <div className="mt-1 text-3xl sm:text-4xl font-black tracking-wide">{formatAmount(data?.devTotal)}</div>
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      报价有效期：30天
                      <br />
                      开发合计（不含第三方按年自付）
                    </div>
                  </div>

                  <div>
                    <div className="text-left text-xs font-bold text-slate-600 md:text-right">选择报价档位</div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {TIER_KEYS.map((key) => {
                        const meta = TIER_BUTTON_META[key];
                        const active = key === tierKey;
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant={active ? "default" : "outline"}
                            className={cn(
                              "h-auto w-full justify-start rounded-xl px-3 py-2 text-left shadow-sm",
                              active && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                            onClick={() => setTierKey(key)}
                          >
                            <div className="flex w-full flex-col gap-0.5">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-extrabold">{meta.label}</span>
                                <span className="text-sm font-black">{meta.price}</span>
                              </div>
                              <span className="text-xs opacity-80">{meta.sub}</span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </header>

      <nav aria-label="报价目录" className="sticky top-2 z-40 mb-4">
        <div className="mx-auto max-w-5xl px-4">
          <div className="hidden md:block">
            <Card className="border-slate-200 bg-white/90 shadow-sm backdrop-blur">
              <CardContent className="p-2">
                <div className="grid grid-cols-3 gap-2">
                  {NAV_LINKS.map((item) => (
                    <Button key={item.href} variant="outline" size="sm" className="h-auto rounded-xl py-2 text-xs font-bold" asChild>
                      <a href={item.href}>{item.short}</a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:hidden">
            <Card className="border-slate-200 bg-white/90 shadow-sm backdrop-blur">
              <CardContent className="p-3">
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-2 text-sm font-extrabold"
                  type="button"
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu className="h-4 w-4" aria-hidden />
                  目录（9段）
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto" hideClose>
          <SheetHeader className="text-left">
            <SheetTitle>报价目录</SheetTitle>
            <SheetDescription>点击条目跳转并关闭抽屉</SheetDescription>
          </SheetHeader>
          <div className="mt-4 grid gap-2 pb-6">
            {NAV_LINKS.map((item) => (
              <Button key={item.href} variant="outline" className="h-auto justify-start rounded-xl py-3 text-sm font-bold" asChild>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.full}
                </a>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <Card id="part-1" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <LayoutList className="h-4 w-4" aria-hidden />
              </span>
              一、项目基本信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <KVGrid items={data.projectBasic} />
          </CardContent>
        </Card>

        <Card id="part-2" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Users className="h-4 w-4" aria-hidden />
              </span>
              二、老师端需求拆解
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeaturesGrid features={data.teacherNeeds} />
          </CardContent>
        </Card>

        <Card id="part-3" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              三、学生端需求拆解
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeaturesGrid features={data.studentNeeds} />
          </CardContent>
        </Card>

        <Card id="part-4" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Server className="h-4 w-4" aria-hidden />
              </span>
              四、后台管理系统需求拆解
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeaturesGrid features={data.backendNeeds} />
          </CardContent>
        </Card>

        <Card id="part-5" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <BarChart3 className="h-4 w-4" aria-hidden />
              </span>
              五、费用明细
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <FeeCards feeItems={data.feeItems} />
              <FeeBreakdownChart feeItems={data.feeItems} formatAmount={formatAmount} />
            </div>
          </CardContent>
        </Card>

        <Card id="part-6" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Link2 className="h-4 w-4" aria-hidden />
              </span>
              六、第三方费用
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThirdPartyCards items={data.thirdParty} />
          </CardContent>
        </Card>

        <Card id="part-7" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Wallet className="h-4 w-4" aria-hidden />
              </span>
              七、付款方式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentsCards payments={data.payments} />
          </CardContent>
        </Card>

        <Card id="part-8" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <AlertTriangle className="h-4 w-4" aria-hidden />
              </span>
              八、重要说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="border-slate-200 bg-slate-50 shadow-none">
              <CardContent className="p-4">
                <OlList items={importantNotes} />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card id="part-9" className="scroll-target mt-4 rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              九、交付标准
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="border-slate-200 bg-slate-50 shadow-none">
              <CardContent className="p-4">
                <OlList items={data.deliveryStandards} />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          报价提示：本报价为阶段性估算（基于当前需求拆解）。若功能范围调整，将同步评估工期与费用。
        </p>
      </main>
    </div>
  );
}
