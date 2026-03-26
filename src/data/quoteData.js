export const formatAmount = (n) => {
  if (typeof n !== 'number') return String(n ?? '');
  const nf = new Intl.NumberFormat('zh-CN');
  return '¥' + nf.format(n);
};

export const quoteData = {
  MVP极简版_25800: {
    tierKey: "MVP极简版_25800",
    tierLabel: "MVP极简版25800",
    devTotal: 25800,
    projectBasic: [
      { label: "项目名称", value: "教育约课平台（MVP极简版）" },
      { label: "开发模式", value: "微信小程序云开发（免服务器）" },
      { label: "开发周期", value: "7–10天" },
      { label: "适用场景", value: "个人教师 / 小工作室试运营" },
      { label: "交付内容", value: "小程序源码（老师端+学生端+云函数）+轻量后台管理系统" },
    ],
    studentNeeds: [
      {
        module: "注册/登录",
        customerNeed: "微信一键登录",
        implementation: "首次登录强制跳转信息页",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "学员信息",
        customerNeed: "填写年级、学习目标",
        implementation: "展示后台配置的剩余课时",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "约课页",
        customerNeed: "选择老师、日期、时间段",
        implementation: "选择后直接提交约课",
        includeStatus: "包含",
        remark: "无复杂筛选",
      },
      {
        module: "我的课程",
        customerNeed: "查看“待上课/已完成”列表",
        implementation: "点击查看课程时间、会议链接",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "课程评价",
        customerNeed: "课程结束后评分（1-5星）",
        implementation: "仅支持文字评价，无标签",
        includeStatus: "包含",
        remark: "简化",
      },
    ],
    teacherNeeds: [
      {
        module: "注册/登录",
        customerNeed: "微信一键登录",
        implementation: "首次登录强制填写资料",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "订单列表",
        customerNeed: "查看“待接单/待上课”",
        implementation: "下拉刷新列表",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "接单操作",
        customerNeed: "待接单状态显示“接单”按钮",
        implementation: "接单后学生端收到通知",
        includeStatus: "包含",
        remark: "无拒单",
      },
      {
        module: "课程详情",
        customerNeed: "查看学生信息、会议链接",
        implementation: "支持查看学生上传文件",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "课后反馈",
        customerNeed: "上传本节课课件",
        implementation: "无结构化表单，仅上传文件",
        includeStatus: "包含",
        remark: "极简",
      },
    ],
    backendNeeds: [
      {
        module: "用户管理",
        customerNeed: "查看老师/学生列表",
        implementation: "支持搜索、禁用账号",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "课时管理",
        customerNeed: "手动为学生增加/减少课时",
        implementation: "无Excel导入，手动输入",
        includeStatus: "包含",
        remark: "",
      },
      {
        module: "订单审核",
        customerNeed: "查看所有约课订单",
        implementation: "手动确认，扣减学生课时",
        includeStatus: "包含",
        remark: "",
      },
    ],
    feeItems: [
      { category: "学生端小程序", content: "约课/评价/课时", amount: 9800 },
      { category: "老师端小程序", content: "接单/课件", amount: 8000 },
      { category: "云开发后端", content: "云函数/数据库", amount: 5000 },
      { category: "后台管理系统", content: "基础管理", amount: 3000 },
      { category: "合计", content: "", amount: 25800 },
    ],
    thirdParty: [
      { type: "第三方费用（客户自付）", project: "微信认证费", amountText: "300/年", desc: "必须", estimate: 300 },
      { type: "第三方费用（客户自付）", project: "云开发资源包", amountText: "≈200/年", desc: "前期免费额度够用", estimate: 200 },
    ],
    payments: [
      { stage: "启动款", ratioText: "40%", amount: 10320, desc: "签订合同后" },
      { stage: "验收款", ratioText: "40%", amount: 10320, desc: "功能演示通过" },
      { stage: "上线款", ratioText: "20%", amount: 5160, desc: "小程序审核上线" },
    ],
    deliveryStandards: [
      "小程序源码（老师端+学生端+云函数）",
      "轻量后台管理系统",
      "操作说明文档",
      "协助微信审核",
      "上线后远程培训 1 次",
    ],
  },

  标准升级版_38000: {
    tierKey: "标准升级版_38000",
    tierLabel: "标准升级版38000",
    devTotal: 38000,
    projectBasic: [
      { label: "项目名称", value: "教育约课平台（标准升级版）" },
      { label: "开发模式", value: "微信小程序云开发" },
      { label: "开发周期", value: "3–4 周" },
      { label: "适用场景", value: "成长型教育机构 / 稳定师资团队" },
      { label: "交付内容", value: "小程序源码（老师端+学生端+云函数）+轻量后台管理系统" },
    ],
    studentNeeds: [
      { module: "注册/登录", customerNeed: "微信一键登录", implementation: "首次登录强制完善信息", includeStatus: "包含", remark: "" },
      { module: "学员信息", customerNeed: "填写年级、学习目标", implementation: "展示剩余课时（后台配置）", includeStatus: "包含", remark: "" },
      { module: "约课页", customerNeed: "按科目筛选老师、选择时间", implementation: "支持上传课程相关文件", includeStatus: "包含", remark: "" },
      { module: "我的课程", customerNeed: "查看课程状态、会议链接", implementation: "课程结束后24小时内可评价", includeStatus: "包含", remark: "" },
      { module: "课程评价", customerNeed: "评分（1-5星）+ 文字评价", implementation: "评价后不可修改", includeStatus: "包含", remark: "" },
    ],
    teacherNeeds: [
      { module: "注册/登录", customerNeed: "微信一键登录", implementation: "填写教学科目、资历、单价", includeStatus: "包含", remark: "" },
      { module: "订单列表", customerNeed: "“待接单/待上课/已完成”Tab", implementation: "下拉刷新，按时间排序", includeStatus: "包含", remark: "" },
      { module: "接单/拒单", customerNeed: "待接单状态显示“接单”“拒单”", implementation: "接单后扣减库存，拒单需选原因", includeStatus: "包含", remark: "" },
      { module: "课程详情", customerNeed: "查看学生信息、文件、会议链接", implementation: "点击文件可预览", includeStatus: "包含", remark: "" },
      { module: "课后反馈", customerNeed: "上传课件 + 填写教学总结", implementation: "必填项：否则无法提交", includeStatus: "包含", remark: "" },
      { module: "我的钱包", customerNeed: "展示累计收入、可提现金额", implementation: "点击“提现”跳转银行卡页", includeStatus: "包含", remark: "" },
      { module: "提现申请", customerNeed: "填写银行卡号、开户行、姓名", implementation: "提交后后台人工审核打款", includeStatus: "包含", remark: "不自动到账" },
    ],
    backendNeeds: [
      { module: "用户管理", customerNeed: "老师/学生列表，支持搜索", implementation: "导出用户数据", includeStatus: "包含", remark: "" },
      { module: "课时配置", customerNeed: "手动增减学生课时", implementation: "支持Excel批量导入", includeStatus: "包含", remark: "" },
      { module: "订单管理", customerNeed: "查看所有订单，手动派单", implementation: "审核通过后扣减课时", includeStatus: "包含", remark: "" },
      { module: "提现审核", customerNeed: "查看提现申请（金额、卡号）", implementation: "操作“通过/驳回”", includeStatus: "包含", remark: "" },
      { module: "结算配置", customerNeed: "设置基础课时费、评分系数", implementation: "例：4.5分以上 × 1.1", includeStatus: "包含", remark: "自动计算" },
    ],
    feeItems: [
      { category: "学生端小程序", content: "含评价/约课", amount: 12000 },
      { category: "老师端小程序", content: "含钱包/提现", amount: 11000 },
      { category: "云开发后端", content: "含自动结算", amount: 7000 },
      { category: "后台管理系统", content: "含提现审核", amount: 8000 },
      { category: "合计", content: "", amount: 38000 },
    ],
    thirdParty: [
      { type: "第三方费用（客户自付）", project: "微信认证费", amountText: "300/年", desc: "必须", estimate: 300 },
      { type: "第三方费用（客户自付）", project: "云开发资源包", amountText: "≈500/年", desc: "建议", estimate: 500 },
      { type: "第三方费用（可选）", project: "腾讯会议API", amountText: "≈2,000/年", desc: "如需商业版", estimate: 2000 },
    ],
    payments: [
      { stage: "启动款", ratioText: "40%", amount: 15200, desc: "签订合同后" },
      { stage: "验收款", ratioText: "40%", amount: 15200, desc: "核心功能演示通过" },
      { stage: "上线款", ratioText: "20%", amount: 7600, desc: "小程序审核上线" },
    ],
    deliveryStandards: [
      "小程序源码（老师端+学生端+云函数）",
      "后台管理系统（网页版）",
      "操作手册（图文版）",
      "协助微信审核",
      "上线后远程培训 1 次",
    ],
  },

  高级完整版_52000: {
    tierKey: "高级完整版_52000",
    tierLabel: "高级完整版52000",
    devTotal: 52000,
    projectBasic: [
      { label: "项目名称", value: "教育约课平台（高级完整版）" },
      { label: "开发模式", value: "微信小程序云开发（商业级架构）" },
      { label: "开发周期", value: "4–5 周" },
      { label: "适用场景", value: "教育机构 / 品牌工作室 / 商业化运营" },
      { label: "交付内容", value: "小程序源码（老师端+学生端+云函数）+轻量后台管理系统" },
    ],
    studentNeeds: [
      { module: "注册/登录", customerNeed: "微信一键登录，自动获取头像昵称", implementation: "首次登录强制跳转完善信息页", includeStatus: "包含", remark: "" },
      { module: "学员信息", customerNeed: "填写年级、学习目标、剩余课时", implementation: "展示当前剩余课时", includeStatus: "包含", remark: "" },
      { module: "约课首页", customerNeed: "选择老师（按科目/评分筛选）、选择日期时间", implementation: "选择后展示老师空闲时段", includeStatus: "包含", remark: "" },
      { module: "约课提交", customerNeed: "上传本节课相关资料（作业/试卷）", implementation: "阅读并同意《上课须知》", includeStatus: "包含", remark: "" },
      { module: "我的课程", customerNeed: "展示“待上课/已完成”课程", implementation: "点击进入课程详情", includeStatus: "包含", remark: "" },
      { module: "课程评价", customerNeed: "课程结束后24小时内可评价", implementation: "评分（1-5星）+ 文字评价", includeStatus: "包含", remark: "" },
      { module: "课程回放", customerNeed: "查看老师上传的课件", implementation: "预留录屏入口（二期）", includeStatus: "部分", remark: "录屏二期" },
    ],
    teacherNeeds: [
      { module: "注册/登录", customerNeed: "微信一键登录，自动获取头像昵称", implementation: "首次登录强制跳转资料填写页", includeStatus: "包含", remark: "" },
      { module: "个人资料", customerNeed: "填写教学科目、资历、单价等信息", implementation: "提交后后台审核，审核通过才可接单", includeStatus: "包含", remark: "" },
      { module: "订单列表", customerNeed: "展示“待接单/待上课/已完成”Tab", implementation: "下拉刷新，按时间排序", includeStatus: "包含", remark: "" },
      { module: "订单详情", customerNeed: "查看学生姓名、约课时间、腾讯会议链接、学生上传的文件", implementation: "点击文件可预览/下载", includeStatus: "包含", remark: "" },
      { module: "接单/拒单", customerNeed: "待接单状态显示“接单”“拒单”按钮", implementation: "接单后学生端收到通知；拒单需填写原因", includeStatus: "包含", remark: "" },
      { module: "课程进行中", customerNeed: "上课前30/15分钟订阅消息提醒", implementation: "点击消息直达课程详情页", includeStatus: "包含", remark: "" },
      { module: "课后反馈", customerNeed: "上传本节课课件（PDF/PPT）", implementation: "必填项：本节课总结、学生表现评分", includeStatus: "包含", remark: "" },
      { module: "我的钱包", customerNeed: "展示累计收入、可提现金额", implementation: "点击“提现”跳转银行卡绑定页", includeStatus: "包含", remark: "" },
      { module: "提现申请", customerNeed: "填写银行卡号、开户行、姓名", implementation: "提交后后台标记为“待审核”，人工打款", includeStatus: "包含", remark: "不自动到账" },
    ],
    backendNeeds: [
      { module: "用户管理", customerNeed: "老师/学生列表，支持搜索、禁用账号", implementation: "导出用户数据为Excel", includeStatus: "包含", remark: "" },
      { module: "课时配置", customerNeed: "手动为学生增加/扣除课时", implementation: "支持Excel批量导入调整", includeStatus: "包含", remark: "" },
      { module: "订单审核", customerNeed: "查看所有约课订单，手动派单给指定老师", implementation: "审核通过后扣减学生课时", includeStatus: "包含", remark: "" },
      { module: "提现审核", customerNeed: "查看老师提现申请（银行卡信息、金额）", implementation: "操作“通过/驳回”，标记打款状态", includeStatus: "包含", remark: "" },
      { module: "数据看板", customerNeed: "展示今日新增用户、今日订单数、成交额", implementation: "按月统计趋势图", includeStatus: "包含", remark: "" },
      { module: "消息推送", customerNeed: "手动给指定学生发送上课提醒", implementation: "支持多选批量发送", includeStatus: "包含", remark: "" },
    ],
    feeItems: [
      { category: "学生端小程序（含交互）", content: "约课/评价/课件", amount: 18000 },
      { category: "老师端小程序（含钱包）", content: "接单/课件/提现", amount: 16000 },
      { category: "云开发后端", content: "含结算逻辑/API", amount: 10000 },
      { category: "后台管理系统", content: "含数据看板", amount: 5000 },
      { category: "测试与上线", content: "兼容性测试", amount: 3000 },
      { category: "合计", content: "", amount: 52000 },
    ],
    thirdParty: [
      { type: "第三方费用（客户自付）", project: "微信认证费", amountText: "300/年", desc: "必须", estimate: 300 },
      { type: "第三方费用（客户自付）", project: "腾讯会议API（商业版）", amountText: "≈2,000/年", desc: "稳定", estimate: 2000 },
      { type: "第三方费用（客户自付）", project: "云开发资源包（高配）", amountText: "≈1,000/年", desc: "建议", estimate: 1000 },
    ],
    payments: [
      { stage: "启动款", ratioText: "40%", amount: 20800, desc: "签订合同后" },
      { stage: "开发完成", ratioText: "30%", amount: 15600, desc: "核心功能演示通过" },
      { stage: "上线验收", ratioText: "30%", amount: 15600, desc: "小程序审核上线" },
    ],
    deliveryStandards: [
      "小程序源码（老师端+学生端+云函数）",
      "后台管理系统（网页版，含数据看板）",
      "产品操作手册（图文版）",
      "协助微信小程序审核",
      "上线后远程培训 1 次",
    ],
  },
};

export const importantNotes = [
  "第三方费用为客户自付，且多为按年计费（认证费/资源包/会议 API），实际以厂商计费为准。",
  "付款节点按合同约定阶段触发：启动款/核心功能演示验收/上线审核等。",
  "功能范围以对应档位“是否包含（包含/部分）”为准；中途新增或调整功能将同步评估工期与费用。",
];

export const TIER_KEYS = ["MVP极简版_25800", "标准升级版_38000", "高级完整版_52000"];
export const TIER_BUTTON_META = {
  MVP极简版_25800: { label: "MVP极简版", price: "¥25,800", sub: "7–10天 · 试运营" },
  标准升级版_38000: { label: "标准升级版", price: "¥38,000", sub: "3–4周 · 稳定师资" },
  高级完整版_52000: { label: "高级完整版", price: "¥52,000", sub: "4–5周 · 商业化运营" },
};

