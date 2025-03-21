import {
  MovingAverage,
  MultiThresholding,
  LocalProperties,
  Sauvola,
  Watershed,
  DivisionFusion,
  Otsu,
  MCACrisp,
  RegionGrowing,
  SegmentationParameters,
  SegmentationType,
  SimpleGlobalThresholding,
} from "@/types/parameters";

const MULTI_THRESHOLDING_DEFAULT: MultiThresholding = {
  type: "lim_multipla",
  hyperLim: [0, 8],
  normalLim: [8, 42],
  poorLim: [42, 76],
  nonLim: [76, 93],
  boneLim: [136, 255],
  activateHyper: true,
  activateNormal: true,
  activatePoor: true,
  activateNon: true,
  activateBone: false,
  activateNonClassified: false,
};

const OTSU_DEFAULT: Otsu = { type: "otsu" };

const REGION_GROWING_DEFAULT: RegionGrowing = {
  type: "crescimento_regioes_fora",
};

export const MCACRISP_SEARCH_AREA_MIN = 1;
export const MCACRISP_SEARCH_AREA_MAX = 51;
export const MCACRISP_SEARCH_AREA_STEP = 2;
export const MCACRISP_WADAPT_MIN = 0;
export const MCACRISP_WADAPT_MAX = 1;
export const MCACRISP_WADAPT_STEP = 0.1;
export const MCACRISP_WCONT_MIN = 0;
export const MCACRISP_WCONT_MAX = 1;
export const MCACRISP_WCONT_STEP = 0.1;
export const MCACRISP_ALPHA_MIN = 20;
export const MCACRISP_ALPHA_MAX = 180;
export const MCACRISP_ALPHA_STEP = 1;
export const MCACRISP_EARLY_STOP_MIN = 0;
export const MCACRISP_EARLY_STOP_MAX = 1;
export const MCACRISP_EARLY_STOP_STEP = 0.001;
export const MCACRISP_MAX_ITERATIONS_MIN = 0;
export const MCACRISP_MAX_ITERATIONS_MAX = 5000;
export const MCACRISP_MAX_ITERATIONS_STEP = 1;
export const MCACRISP_DMAX_MIN = 5;
export const MCACRISP_DMAX_MAX = 50;
export const MCACRISP_DMAX_STEP = 1;
export const MCACRISP_RADIUS_MIN = 10;
export const MCACRISP_RADIUS_MAX = 100;
export const MCACRISP_RADIUS_STEP = 1;
export const MCACRISP_NPIXELS_MIN = 10;
export const MCACRISP_NPIXELS_MAX = 100;
export const MCACRISP_NPIXELS_STEP = 1;

const MCACRISP_DEFAULT: MCACrisp = {
  type: "segmentation",
  nPixels: 60,
  radius: 60,
  wCont: 0.6,
  wAdapt: 0.3,
  dMax: 6,
  searchArea: 9,
  alpha: 20,
  earlyStop: 0.001,
  maxIterations: 1000,
};

export const MA_B_MIN = 0.5;
export const MA_B_MAX = 1.5;
export const MA_B_STEP = 0.1;
export const MA_N_MIN = 50;
export const MA_N_MAX = 200;
export const MA_N_STEP = 5;

const MA_DEFAULT: MovingAverage = {
  type: "lim_media_mov",
  n: 170,
  b: 0.5,
  applyInterpolation: true,
};

export const LOCAL_AB_MIN = 0.5;
export const LOCAL_AB_MAX = 1.5;
export const LOCAL_AB_STEP = 0.1;
export const LOCAL_WIN_MIN = 51;
export const LOCAL_WIN_MAX = 191;
export const LOCAL_WIN_STEP = 20;

const LOCAL_PROPERTIES_DEFAULT: LocalProperties = {
  type: "lim_prop_locais",
  windowSize: 151,
  a: 1,
  b: 0.5,
  useGlobalMean: false,
  applyInterpolation: true,
};

export const SAUVOLA_KERNEL_MIN = 3;
export const SAUVOLA_KERNEL_MAX = 9;
export const SAUVOLA_KERNEL_STEP = 2;
export const SAUVOLA_K_MIN = 0.01;
export const SAUVOLA_K_MAX = 0.1;
export const SAUVOLA_K_STEP = 0.01;
export const SAUVOLA_MORPHOLOGY_MIN = 1;
export const SAUVOLA_MORPHOLOGY_MAX = 5;
export const SAUVOLA_MORPHOLOGY_STEP = 1;

const SAUVOLA_DEFAULT: Sauvola = {
  type: "sauvola",
  windowSize: 151,
  k: 0.02,
  applyInterpolation: true,
  applyMorphology: false,
  kernelSize: 3,
  morphologyIterations: 1,
};

export const WSHED_THRESH_MIN = 0;
export const WSHED_THRESH_MAX = 255;
export const WSHED_THRESH_STEP = 1;
export const WSHED_KERNEL_MIN = 3;
export const WSHED_KERNEL_MAX = 9;
export const WSHED_KERNEL_STEP = 2;
export const WSHED_IT_MORPH_MIN = 1;
export const WSHED_IT_MORPH_MAX = 5;
export const WSHED_IT_MORPH_STEP = 1;
export const WSHED_IT_DILAT_MIN = 1;
export const WSHED_IT_DILAT_MAX = 5;
export const WSHED_IT_DILAT_STEP = 1;
export const WSHED_DIST_MIN = 0;
export const WSHED_DIST_MAX = 1;
export const WSHED_DIST_STEP = 0.1;

const WATERSHED_DEFAULT: Watershed = {
  type: "watershed",
  threshold: 60,
  applyInterpolation: true,
  applyMorphology: true,
  kernelSize: 3,
  morphologyIterations: 2,
  dilationIterations: 1,
  distFactor: 0.3,
};

export const DF_VLIM_MIN = 0;
export const DF_VLIM_MAX = 100;
export const DF_VLIM_STEP = 1;
export const DF_MLIM_MIN = 0;
export const DF_MLIM_MAX = 100;
export const DF_MLIM_STEP = 1;
export const DF_MREF_MIN = 0;
export const DF_MREF_MAX = 100;
export const DF_MREF_STEP = 1;

const DIVISION_FUSION_DEFAULT: DivisionFusion = {
  type: "divisao_e_fusao",
  varLimit: 40,
  meanLimit: 40,
  meanReference: 5,
};

export const SIMPLE_GLOBAL_THRESH_MIN = 0;
export const SIMPLE_GLOBAL_THRESH_MAX = 255;
export const SIMPLE_GLOBAL_THRESH_STEP = 1;
export const SIMPLE_GLOBAL_DELTA_MIN = 0;
export const SIMPLE_GLOBAL_DELTA_MAX = 255;
export const SIMPLE_GLOBAL_DELTA_STEP = 1;

const SIMPLE_GLOBAL_DEFAULT: SimpleGlobalThresholding = {
  type: "lim_global_simples",
  threshold: 50,
  deltaThreshold: 5,
};

export const SEGMENTATION_DEFAULTS: Record<
  SegmentationType,
  SegmentationParameters
> = {
  lim_media_mov: MA_DEFAULT,
  lim_global_simples: SIMPLE_GLOBAL_DEFAULT,
  lim_multipla: MULTI_THRESHOLDING_DEFAULT,
  lim_prop_locais: LOCAL_PROPERTIES_DEFAULT,
  sauvola: SAUVOLA_DEFAULT,
  watershed: WATERSHED_DEFAULT,
  divisao_e_fusao: DIVISION_FUSION_DEFAULT,
  otsu: OTSU_DEFAULT,
  crescimento_regioes_fora: REGION_GROWING_DEFAULT,
  segmentation: MCACRISP_DEFAULT,
};
