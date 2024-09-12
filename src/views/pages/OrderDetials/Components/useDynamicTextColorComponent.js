import { useEffect, useState } from "react";

const useDynamicTextColorComponent = (imageUrl) => {
  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });
  useEffect(() => {
    const calculateAverageColor = () => {
      const blockSize = 5;
      const defaultRGB = { r: 0, g: 0, b: 0 };
      const canvas = document.createElement("canvas");
      const context = canvas.getContext && canvas.getContext("2d");

      if (!context) {
        setAverageColor(defaultRGB);
        return;
      }

      const img = document.createElement("img");
      img.src = imageUrl;
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const height = (canvas.height =
          img.naturalHeight || img.offsetHeight || img.height);
        const width = (canvas.width =
          img.naturalWidth || img.offsetWidth || img.width);

        if (width === 0 || height === 0) {
          console.error("Image width or height is zero");
          setAverageColor(defaultRGB);
          return;
        }

        context.drawImage(img, 0, 0);

        let data;
        try {
          data = context.getImageData(0, 0, width, height);
        } catch (e) {
          setAverageColor(defaultRGB);
          return;
        }

        const length = data.data.length;
        let i = -4;
        let rgb = { r: 0, g: 0, b: 0 };
        let count = 0;

        while ((i += blockSize * 4) < length) {
          ++count;
          rgb.r += data.data[i];
          rgb.g += data.data[i + 1];
          rgb.b += data.data[i + 2];
        }

        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        setAverageColor(rgb);
      };

      img.onerror = () => {
        console.error("Failed to load image");
        setAverageColor(defaultRGB);
      };
    };

    if (imageUrl) {
      calculateAverageColor();
    }
  }, [imageUrl]);

  return averageColor;
};

export default useDynamicTextColorComponent;
