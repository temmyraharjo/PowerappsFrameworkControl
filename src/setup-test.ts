import { JSDOM } from 'jsdom';
const {
  window,
} = new JSDOM(
  '<html><body><div id="div-main"></div></body></html>',
  { url: 'http://localhost' }
);

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      FileReader: any;
    }
  }
}

export class mockFileReader implements FileReader {
  error: DOMException | null;
  onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any);
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onloadstart: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  readyState: number;
  result: string | ArrayBuffer | null;
  abort(): void {
    throw new Error('Method not implemented.');
  }
  readAsArrayBuffer(blob: Blob): void {
    throw new Error('Method not implemented.');
  }
  readAsBinaryString(blob: Blob): void {
    throw new Error('Method not implemented.');
  }
  readAsDataURL(blob: Blob): void {
    this.result = 'call-from-mock-file-reader';
    this.onload({ target: { result: 'success' } } as ProgressEvent<FileReader>);
  }
  readAsText(blob: Blob, encoding?: string): void {
    throw new Error('Method not implemented.');
  }
  DONE: number;
  EMPTY: number;
  LOADING: number;
  addEventListener<K extends 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress'>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: any, listener: any, options?: any) {
    throw new Error('Method not implemented.');
  }
  removeEventListener<K extends 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress'>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: any, listener: any, options?: any) {
    throw new Error('Method not implemented.');
  }
  dispatchEvent(event: Event): boolean {
    throw new Error('Method not implemented.');
  }
}

export function setup() {
  global.document = window.document;
  global.window = global.document.defaultView as Window;
  global.FileReader = mockFileReader;
}
