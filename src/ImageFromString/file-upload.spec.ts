import { expect } from 'chai';
import { fileUpload, controls } from './file-upload';
import { IInputs } from './generated/ManifestTypes';

describe('fileupload control tests', () => {
  let context: ComponentFramework.Context<IInputs>;
  let htmlDivElement: HTMLDivElement;

  beforeEach(() => {
    htmlDivElement = document.createElement('div') as HTMLDivElement;
    document.body.appendChild(htmlDivElement);

    context = {} as ComponentFramework.Context<IInputs>;
  });

  describe('generate fileupload', () => {
    it('can generate fileupload control', () => {
      const file = new fileUpload(context, htmlDivElement, () => { });
      file.generate();

      expect(file).not.null;

      const div = document.getElementById(controls.div);
      expect(div).not.null;

      const label = document.getElementById(controls.label);
      expect(label).not.null;

      const imageUpload = document.getElementById(controls.file);
      expect(imageUpload).not.null;

      const button = document.getElementById(controls.button);
      expect(button).not.null;

      const information = document.getElementById(controls.information);
      expect(information).not.null;
    });
  });

  describe('submit button', () => {
    it('can validate control', () => {
      const file = new fileUpload(context, htmlDivElement, () => { });
      file.generate();
      file.submit();

      const information = document.getElementById(controls.information);
      expect(information?.style.display).to.equal('block');
    });

    it('can transform Blob to Base64String', async () => {
      const blob = new Blob(['a'.repeat(1024)], { type: 'image/jpg' });
      const file = new fileUpload(context, htmlDivElement, () => { });
      const result = await file.convertToBase64(blob);
      expect(result).to.not.null;
    });

    it('can set input-file to empty', async () => {
      const file = new fileUpload(context, htmlDivElement, () => { });
      file.generate();
      const input = document.getElementById(controls.file) as HTMLInputElement;
      input.setAttribute('value', __dirname + 'img/sample.jpg');
      file.clearFile();
      expect(input.getAttribute('value')).to.equal('');
    });

    it('can reduce the size of the image', async () => {
      const base64Image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      const file = new fileUpload(context, htmlDivElement, () => { });
      const resize = await file.resize(base64Image);
      expect(resize).to.not.null;
    });
  });
});