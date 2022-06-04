namespace WebStore.Db.Model.Enum
{
    public static class PhoneImage
    {
        public static Dictionary<string, string> Images;
        static PhoneImage()
        {
            Images = new Dictionary<string, string>()
            {
                {"Blue", "https://yellow.ua/media/catalog/product/cache/8/small_image/211x211/9df78eab33525d08d6e5fb8d27136e95/2/2/221291329_7.jpg" },
                {"Green", "https://yellow.ua/media/catalog/product/cache/8/small_image/211x211/9df78eab33525d08d6e5fb8d27136e95/a/p/apple-iphone-13-pro-256gb-alpine-green-2_6.1000x1000_1_1.jpg" },
                {"Silver", "https://yellow.ua/media/catalog/product/cache/8/small_image/211x211/9df78eab33525d08d6e5fb8d27136e95/2/2/221301345_4.jpg" },
                {"Gold", "https://yellow.ua/media/catalog/product/cache/8/small_image/211x211/9df78eab33525d08d6e5fb8d27136e95/2/2/221234858_4.jpg" },
                {"Graphite", "https://yellow.ua/media/catalog/product/cache/8/small_image/211x211/9df78eab33525d08d6e5fb8d27136e95/2/2/221280121_5.jpg" }
            };
        }
    }
}
