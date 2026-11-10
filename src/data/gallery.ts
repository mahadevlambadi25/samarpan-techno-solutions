import type { GalleryCategory, GalleryItem } from '../types'
import { photos } from './photos'

/** Illustrative gallery. Replace with actual company photographs when available. */
export const galleryItems: GalleryItem[] = [
  { photo: photos.panelOpen, caption: 'Industrial control panel interior', category: 'Control Panels' },
  { photo: photos.panelRoom, caption: 'Electrical panel room', category: 'Control Panels' },
  { photo: photos.fabrication, caption: 'Metal fabrication workshop', category: 'Manufacturing' },
  { photo: photos.testing, caption: 'Panel testing with a multimeter', category: 'Engineering Work' },
  { photo: photos.controlRoom, caption: 'Switchboards in a control room', category: 'Industrial Equipment' },
  { photo: photos.breakerBox, caption: 'Circuit breakers and wiring', category: 'Control Panels' },
  { photo: photos.factoryLine, caption: 'Automated production line', category: 'Manufacturing' },
  { photo: photos.indicators, caption: 'Indicator lamps and selector switches', category: 'Control Panels' },
  { photo: photos.testBench, caption: 'Electrical test bench', category: 'Engineering Work' },
  { photo: photos.factoryMachinery, caption: 'Heavy industrial machinery', category: 'Industrial Equipment' },
  { photo: photos.meters, caption: 'Panel meters and displays', category: 'Control Panels' },
  { photo: photos.engineers, caption: 'Engineers at an industrial plant', category: 'Engineering Work' },
  { photo: photos.factoryInterior, caption: 'Manufacturing facility interior', category: 'Manufacturing' },
  { photo: photos.breakersWhite, caption: 'DIN-rail circuit breakers', category: 'Control Panels' },
  { photo: photos.wiring, caption: 'Wire terminations', category: 'Engineering Work' },
  { photo: photos.machine, caption: 'Industrial machine in a production hall', category: 'Industrial Equipment' },
  { photo: photos.switchBox, caption: 'Industrial power switch box', category: 'Industrial Equipment' },
  { photo: photos.wiresClose, caption: 'Routed panel wiring', category: 'Engineering Work' },
]

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All',
  'Control Panels',
  'Manufacturing',
  'Engineering Work',
  'Industrial Equipment',
]
