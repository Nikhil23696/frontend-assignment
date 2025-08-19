
✅ Fixed Server-Side Rendering (SSR) Bug:
- Initially the product page was not rendering during SSR and was returning undefined/404. 
- Fixed by using fetchProductById directly on the server and returning the product object, which now renders correctly on the initial server request.

✅ Fixed Color / Size Synchronization:
- Moving size filtering logic to the parent component and using useEffect to reset size upon color change.
- This ensures size options update immediately as per selected color.

✅ UI & UX Fixes:
- Added null-check for product prop inside ProductDetails.
- Added focus styles for buttons, fixed missing alt text, and added price formatting (.toFixed(2)).

✅ Implemented Recently Viewed Functionality:
- Used localStorage in a useEffect to save the last 3 viewed products and displayed them in a reusable component.

✅ Add to Cart:
- Connected the global addToCart function with selected color & size to add items to cart along with cart badge update.

✅ Performance Improvements:
- Replaced all <img> tags with Next.js <Image> component for optimization.
- Implemented a simple client-side caching mechanism using localStorage for the product data.
