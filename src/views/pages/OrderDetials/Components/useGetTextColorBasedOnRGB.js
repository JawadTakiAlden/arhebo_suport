
const useGetTextColorBasedOnRGB = (backgroundRGB) => {
    function rgbToLuminance(r, g, b) {
        // Function to linearize RGB components
        function linearize(c) {
            c = c / 255.0;
            return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        }

        // Calculate linearized RGB components
        let rLin = linearize(r);
        let gLin = linearize(g);
        let bLin = linearize(b);

        // Calculate luminance
        return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
    }

    // Calculate luminance for the background color
    let backgroundLuminance = rgbToLuminance(backgroundRGB[0], backgroundRGB[1], backgroundRGB[2]);

    // Luminance for black (0, 0, 0)
    let blackLuminance = rgbToLuminance(0, 0, 0);
    // Luminance for white (255, 255, 255)
    let whiteLuminance = rgbToLuminance(255, 255, 255);

    // Contrast ratios
    let contrastWithBlack = (backgroundLuminance + 0.05) / (blackLuminance + 0.05);
    let contrastWithWhite = (whiteLuminance + 0.05) / (backgroundLuminance + 0.05);

    // Choose the color with the higher contrast ratio
    if (contrastWithBlack > contrastWithWhite) {
        return [0, 0, 0];  // Black
    } else {
        return [255, 255, 255];  // White
    }
}

export default useGetTextColorBasedOnRGB