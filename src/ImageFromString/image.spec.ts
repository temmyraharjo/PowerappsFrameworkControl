import { expect } from 'chai';
import { image, controls } from './image';
import { IInputs } from './generated/ManifestTypes';

describe('image control tests', () => {
  let context: ComponentFramework.Context<IInputs>;
  let htmlDivElement: HTMLDivElement;

  beforeEach(() => {
    htmlDivElement = document.createElement('div') as HTMLDivElement;
    document.body.appendChild(htmlDivElement);
    context = {} as ComponentFramework.Context<IInputs>;
  });

  describe('generate image', () => {
    it('can generate image control', () => {
      const img = new image(context, htmlDivElement);
      img.generate();

      expect(img).not.null;

      const div = document.getElementById(controls.div);
      expect(div).not.null;

      const imageCtrl = document.getElementById(controls.image);
      expect(imageCtrl).not.null;
    });

    it('set src image', () => {
        const img = new image(context, htmlDivElement);
        img.generate();

        img.setSrc('http://localhost/img1.jpg');

        const imgCtrl = document.getElementById(controls.image) as HTMLImageElement;
        expect(imgCtrl.src).to.equal('http://localhost/img1.jpg');
    });
  });
});