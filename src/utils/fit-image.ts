interface Dimensions {
  width: number;
  height: number;
}

/** Returns image width and height suitable to fit given container dimensions. */
export const fitImage = (dimensions: Dimensions) => (image?: Dimensions) => {
  if (!image) {
    return { width: dimensions.width * 2, height: dimensions.height * 2 };
  }

  const ratio = image.width / image.height;

  // Double the dimensions to get better image quality.
  let width = dimensions.width * 2;
  let height = dimensions.height * 2;

  if (width / height > ratio) {
    width = height * ratio;
  } else {
    height = width / ratio;
  }

  if (width > image.width) {
    width = image.width;
    height = width / ratio;
  }

  if (height > image.height) {
    height = image.height;
    width = height * ratio;
  }

  return { width: Math.floor(width), height: Math.floor(height) };
};
