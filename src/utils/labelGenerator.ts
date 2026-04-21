type MeiLabelAttributes = {
  toneType?: string;
  lhFinger?: string;
  lhTech?: string;
  rhTech?: string;
  xian?: string;
  hui?: string;
  fen?: string;
  markExpressive?: string;
  markStruct?: string;
  markGeneral?: string;
};

const NUMBER_LABELS: Record<string, string> = {
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
  "10": "十",
  "11": "十一",
  "12": "十二",
  "13": "十三",
};

const LH_FINGER_LABELS: Record<string, string> = {
  da: "大",
  shi: "食",
  zhong: "中",
  ming: "名",
  gui: "跪",
};

const LH_PRIMARY_TECH_LABELS: Record<string, string> = {
  chuo: "绰",
  zhu: "注",
};

const LH_AUX_TECH_LABELS: Record<string, string> = {
  yin: "吟",
  nao: "猱",
  shang: "上",
  xia: "下",
  jinfu: "进复",
  tuifu: "退复",
  qiaqi: "掐起",
  zhuaqi: "爪起",
  daiqi: "带起",
};

const RH_TECH_LABELS: Record<string, string> = {
  tuo: "托",
  pi: "劈",
  tiao: "挑",
  mo: "抹",
  ti: "剔",
  gou: "勾",
  zhai: "摘",
  da: "打",
  li: "历",
  tan: "弹",
  shuangtan: "双弹",
  cuo: "撮",
  bo: "拨",
  ci: "剌",
};

const PANGZHU_LABELS: Record<string, string> = {
  ji: "急",
  huan: "缓",
  jin: "紧",
  man: "慢",
  qing: "轻",
  zhong: "重",
  xi: "息",
  shaoji: "少息",
  zaizuo: "再作",
  congtouzaizuo: "从头再作",
  gou: "勾",
  conggouzaizuo: "从勾再作",
  quzhong: "曲终",
  jiu: "就",
  zhi: "至",
  ci: "次",
  mo: "末",
};

const COMPOUND_PREFIX_TECHS = new Set(["tan", "shuangtan", "cuo", "bo", "ci"]);

const getMappedLabel = (
  labels: Record<string, string>,
  value?: string,
): string => {
  if (!value) {
    return "";
  }

  return labels[value] ?? "";
};

const joinLabelParts = (...parts: Array<string | undefined>): string =>
  parts.filter((part): part is string => Boolean(part)).join("");

const readAttributes = (element: Element): MeiLabelAttributes => ({
  toneType: element.getAttribute("tone.type") || undefined,
  lhFinger: element.getAttribute("lh.finger") || undefined,
  lhTech: element.getAttribute("lh.tech") || undefined,
  rhTech: element.getAttribute("rh.tech") || undefined,
  xian: element.getAttribute("xian") || undefined,
  hui: element.getAttribute("hui") || undefined,
  fen: element.getAttribute("fen") || undefined,
  markExpressive: element.getAttribute("mark.expressive") || undefined,
  markStruct: element.getAttribute("mark.struct") || undefined,
  markGeneral: element.getAttribute("mark.general") || undefined,
});

const mergeAttributes = (
  parentAttributes: MeiLabelAttributes,
  childAttributes: MeiLabelAttributes,
): MeiLabelAttributes => ({
  toneType: childAttributes.toneType ?? parentAttributes.toneType,
  lhFinger: childAttributes.lhFinger ?? parentAttributes.lhFinger,
  lhTech: childAttributes.lhTech ?? parentAttributes.lhTech,
  rhTech: childAttributes.rhTech ?? parentAttributes.rhTech,
  xian: childAttributes.xian ?? parentAttributes.xian,
  hui: childAttributes.hui ?? parentAttributes.hui,
  fen: childAttributes.fen ?? parentAttributes.fen,
  markExpressive: childAttributes.markExpressive ?? parentAttributes.markExpressive,
  markStruct: childAttributes.markStruct ?? parentAttributes.markStruct,
  markGeneral: childAttributes.markGeneral ?? parentAttributes.markGeneral,
});

const formatXian = (xian?: string): string => getMappedLabel(NUMBER_LABELS, xian);

const formatPosition = (hui?: string, fen?: string): string => {
  const huiLabel = getMappedLabel(NUMBER_LABELS, hui);

  if (!huiLabel) {
    return "";
  }

  if (!fen) {
    if (hui === "11" || hui === "12" || hui === "13") {
      return `${huiLabel}徽`;
    }

    return huiLabel;
  }

  const fenLabel = getMappedLabel(NUMBER_LABELS, fen);

  if (!fenLabel) {
    return huiLabel;
  }

  // The font treats 十一 / 十二 / 十三 after a left-hand glyph as 10.1 / 10.2 / 10.3.
  if (hui === "10" && (fen === "1" || fen === "2" || fen === "3")) {
    return `${huiLabel}点${fenLabel}`;
  }

  return `${huiLabel}${fenLabel}`;
};

const inferAtomicToneType = (attributes: MeiLabelAttributes): string | undefined => {
  if (attributes.toneType) {
    return attributes.toneType;
  }

  if (attributes.lhFinger || attributes.hui || attributes.fen || attributes.lhTech) {
    return "an";
  }

  if (attributes.xian) {
    return "san";
  }

  return undefined;
};

const formatCompoundPartXian = (
  attributes: MeiLabelAttributes,
  positionText: string,
): string => {
  const xianText = formatXian(attributes.xian);

  if (!xianText) {
    return positionText;
  }

  if (!positionText) {
    return xianText;
  }

  return `${positionText}，${xianText}`;
};

const serializePangzhu = (attributes: MeiLabelAttributes): string =>
  getMappedLabel(
    PANGZHU_LABELS,
    attributes.markExpressive ?? attributes.markStruct ?? attributes.markGeneral,
  ) || "?";

const serializePangzi = (attributes: MeiLabelAttributes): string => {
  const techText = getMappedLabel(LH_AUX_TECH_LABELS, attributes.lhTech);
  const positionText = formatCompoundPartXian(
    attributes,
    formatPosition(attributes.hui, attributes.fen),
  );

  return joinLabelParts(techText, positionText) || "?";
};

const serializeAtomicZhengzi = (attributes: MeiLabelAttributes): string => {
  const toneType = inferAtomicToneType(attributes);
  const rhTechText = getMappedLabel(RH_TECH_LABELS, attributes.rhTech);
  const xianText = formatXian(attributes.xian);

  if (toneType === "san") {
    return joinLabelParts("散", rhTechText, xianText) || "?";
  }

  const positionText = formatPosition(attributes.hui, attributes.fen);
  const lhFingerText = getMappedLabel(LH_FINGER_LABELS, attributes.lhFinger);
  const lhTechText = getMappedLabel(LH_PRIMARY_TECH_LABELS, attributes.lhTech);
  const bodyText = joinLabelParts(
    lhFingerText,
    positionText,
    lhTechText,
    rhTechText,
    xianText,
  );

  if (!bodyText) {
    return "?";
  }

  if (toneType === "fan") {
    return `泛音${bodyText}`;
  }

  return bodyText;
};

const serializeLiCompound = (
  parentAttributes: MeiLabelAttributes,
  partElements: Element[],
): string => {
  const parentToneType = inferAtomicToneType(parentAttributes);
  const prefixText =
    parentToneType === "san"
      ? joinLabelParts("散", getMappedLabel(RH_TECH_LABELS, parentAttributes.rhTech))
      : joinLabelParts(
          parentToneType === "fan" ? "泛音" : undefined,
          getMappedLabel(LH_FINGER_LABELS, parentAttributes.lhFinger),
          formatPosition(parentAttributes.hui, parentAttributes.fen),
          getMappedLabel(LH_PRIMARY_TECH_LABELS, parentAttributes.lhTech),
          getMappedLabel(RH_TECH_LABELS, parentAttributes.rhTech),
        );

  const xianText = partElements
    .map((partElement) => formatXian(readAttributes(partElement).xian))
    .join("");

  return joinLabelParts(prefixText, xianText) || "?";
};

const serializeCompoundPart = (attributes: MeiLabelAttributes): string => {
  const toneType = inferAtomicToneType(attributes);

  if (toneType === "san") {
    return joinLabelParts("散", formatXian(attributes.xian)) || "?";
  }

  const positionText = joinLabelParts(
    getMappedLabel(LH_FINGER_LABELS, attributes.lhFinger),
    formatPosition(attributes.hui, attributes.fen),
    getMappedLabel(LH_PRIMARY_TECH_LABELS, attributes.lhTech),
  );
  const bodyText = formatCompoundPartXian(attributes, positionText);

  if (!bodyText) {
    return "?";
  }

  if (toneType === "fan") {
    return `泛音${bodyText}`;
  }

  return bodyText;
};

const serializeCompoundZhengzi = (
  element: Element,
  parentAttributes: MeiLabelAttributes,
): string => {
  const partElements = Array.from(element.children).filter(
    (child) => child.localName === "zPart",
  );

  if (partElements.length === 0) {
    return serializeAtomicZhengzi(parentAttributes);
  }

  if (parentAttributes.rhTech === "li") {
    return serializeLiCompound(parentAttributes, partElements);
  }

  const partTexts = partElements
    .map((partElement) =>
      serializeCompoundPart(
        mergeAttributes(parentAttributes, readAttributes(partElement)),
      ),
    )
    .filter((partText) => partText !== "?");

  if (partTexts.length === 0) {
    return "?";
  }

  const rhTechText = getMappedLabel(RH_TECH_LABELS, parentAttributes.rhTech);
  const bodyText = partTexts.join("；");

  if (COMPOUND_PREFIX_TECHS.has(parentAttributes.rhTech ?? "")) {
    return joinLabelParts(rhTechText, bodyText) || "?";
  }

  return joinLabelParts(rhTechText, bodyText) || bodyText;
};

/**
 * Generates a readable Jianzipu label from a MEI Jianzipu element.
 * This is used only when the explicit @label is missing.
 */
export const generateLabelFromMeiElement = (element: Element): string => {
  const attributes = readAttributes(element);

  if (element.localName === "pangzhu") {
    return serializePangzhu(attributes);
  }

  if (element.localName === "pangzi") {
    return serializePangzi(attributes);
  }

  if (element.localName === "zhengzi") {
    return serializeCompoundZhengzi(element, attributes);
  }

  return "?";
};
