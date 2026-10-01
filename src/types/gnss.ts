export interface GNSSPoint {
  id: string;
  y: number; // Sağa (Easting)
  x: number; // Yukarı (Northing)
  h: number; // Elipsoit yüksekliği
  n: number; // Jeoit ondülasyonu
  knownH?: number | null; // Bilinen ortometrik yükseklik (Röper A ve B için)
}

export interface ProcessedPoint extends GNSSPoint {
  rawH: number;         // h - N (Ham Ortometrik Kot)
  segDist: number;      // Komşu nokta ile arasındaki mesafe S_i (m)
  cumDist: number;      // Başlangıçtan itibaren birikimli mesafe S_top (m)
  correctionMm: number; // Kenara düşen düzeltme v_i (mm)
  cumCorrectionM: number; // Birikimli düzeltme (m)
  adjustedH: number;    // Nihai dengelenmiş ortometrik kot H_i (m)
  lat?: number;
  lon?: number;
}

export interface AdjustmentResult {
  points: ProcessedPoint[];
  H_start: number;
  H_end: number;
  totalDist: number;
  totalDistKm: number;
  deltaH_real: number;
  deltaH_gnss: number;
  startOffset: number;
  offsetMm: number;
  W_meters: number;
  W_mm: number;
  T_mm: number;
  m_coef: number;
  isAccepted: boolean;
}

export type CRSSystem = 'itrf3' | 'utm6' | 'ed50';
