import { IInputs } from './generated/ManifestTypes';

export const controls = Object.freeze({
    image: 'image-image',
    div: 'image-main-div'
});

export class image {
    constructor(
        private context: ComponentFramework.Context<IInputs>,
        private htmlDivElement: HTMLDivElement) { }

    generate() {
        const maindiv = document.createElement('div') as HTMLDivElement;
        maindiv.setAttribute('class', 'mb-3');
        maindiv.setAttribute('id', controls.div);

        maindiv.appendChild(this.getImage());

        this.htmlDivElement.appendChild(maindiv);
    }

    getImage() {
        const image = document.createElement('img');
        image.setAttribute('class', 'img-fluid');
        image.setAttribute('id', controls.image);

        return image;
    }

    setSrc(imageString: string | ArrayBuffer) {
        const image = document.getElementById(controls.image) as HTMLImageElement;
        image.setAttribute('src', imageString as string);
    }
}