// Utility function to transform Firestore data to a simpler format
export function transformFirestoreData(data) {
  if (!data || !data.fields) {
    console.error("Invalid Firestore data:", data);
    return {};
  }

  const fields = data.fields;

  return {
    id: fields.id?.integerValue || "",
    title: fields.title?.stringValue || "",
    description: fields.description?.stringValue || "",
    price: fields.price?.doubleValue || 0,
    rating: fields.rating?.doubleValue || 0,
    category: fields.category?.stringValue || "",
    stock: fields.stock?.integerValue || 0,
    images: Array.isArray(fields.images?.arrayValue?.values)
      ? fields.images.arrayValue.values.map((img) => img.stringValue || "")
      : [],
    thumbnail: fields.thumbnail?.stringValue || "",
    brand: fields.brand?.stringValue || "",
    warrantyInformation: fields.warrantyInformation?.stringValue || "",
    returnPolicy: fields.returnPolicy?.stringValue || "",
    shippingInformation: fields.shippingInformation?.stringValue || "",
    availabilityStatus: fields.availabilityStatus?.stringValue || "",
    reviews: Array.isArray(fields.reviews?.arrayValue?.values)
      ? fields.reviews.arrayValue.values.map((review) => {
          const reviewFields = review.mapValue?.fields || {};
          return {
            reviewerName: reviewFields.reviewerName?.stringValue || "Anonymous",
            reviewerEmail: reviewFields.reviewerEmail?.stringValue || "",
            rating: reviewFields.rating?.integerValue || 0,
            comment: reviewFields.comment?.stringValue || "",
            date: reviewFields.date?.stringValue || "",
          };
        })
      : [],
    discountPercentage: fields.discountPercentage?.doubleValue || 0,
    weight: fields.weight?.integerValue || 0,
    dimensions: {
      depth: fields.dimensions?.mapValue?.fields?.depth?.doubleValue || 0,
      height: fields.dimensions?.mapValue?.fields?.height?.doubleValue || 0,
      width: fields.dimensions?.mapValue?.fields?.width?.doubleValue || 0,
    },
    sku: fields.sku?.stringValue || "",
    tags: Array.isArray(fields.tags?.arrayValue?.values)
      ? fields.tags.arrayValue.values.map((tag) => tag.stringValue || "")
      : [],
    meta: {
      barcode: fields.meta?.mapValue?.fields?.barcode?.stringValue || "",
      qrCode: fields.meta?.mapValue?.fields?.qrCode?.stringValue || "",
      createdAt: fields.meta?.mapValue?.fields?.createdAt?.stringValue || "",
      updatedAt: fields.meta?.mapValue?.fields?.updatedAt?.stringValue || "",
    },
  };
}
