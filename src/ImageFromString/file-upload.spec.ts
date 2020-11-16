import { expect } from 'chai';
import { fileUpload, controls } from './file-upload';
import { IInputs } from './generated/ManifestTypes';
import * as init from '../setup-test';

describe('fileupload control tests', () => {
  let context: ComponentFramework.Context<IInputs>;
  let htmlDivElement: HTMLDivElement;

  beforeEach(() => {
    init.setup();
    htmlDivElement = document.getElementById('div-main') as HTMLDivElement;
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

    it('can validate control', () => {
      const file = new fileUpload(context, htmlDivElement, () => { });
      file.generate();
      file.submit();

      const information = document.getElementById(controls.information);
      expect(information?.style.display).to.equal('block');
    });

    it('can call convertToBase64', async () => {
      const file = new fileUpload(context, htmlDivElement, () => { });
      await file.convertToBase64({}).then(success => {
        expect(success).to.equal('call-from-mock-file-reader');
      });
    });
  });
});