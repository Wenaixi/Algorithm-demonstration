# Algorithm Demonstration

Interactive visualization of sorting algorithms.

## Version

v1.0.0

## Features

- Visualize 10 popular sorting algorithms with interactive animations
- Real-time performance statistics (comparisons, swaps, execution time)
- Interactive controls to adjust sorting speed and array size
- Multiple data generation modes (random, sorted, reverse sorted, duplicates, nearly sorted)
- Responsive design that works on desktop and mobile devices
- Clean and intuitive user interface

## Algorithms Implemented

1. **Bubble Sort** - A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
2. **Selection Sort** - An in-place comparison sorting algorithm that divides the input list into a sorted and an unsorted region.
3. **Insertion Sort** - A simple sorting algorithm that builds the final sorted array one item at a time.
4. **Merge Sort** - An efficient, stable, divide-and-conquer sorting algorithm.
5. **Quick Sort** - An efficient sorting algorithm that uses a divide-and-conquer approach.
6. **Heap Sort** - A comparison-based sorting algorithm that uses a binary heap data structure.
7. **Shell Sort** - A generalization of insertion sort that allows the exchange of items that are far apart.
8. **Counting Sort** - A non-comparison sorting algorithm that works by counting the number of objects having distinct key values.
9. **Radix Sort** - A non-comparison sorting algorithm that sorts integers by processing individual digits.
10. **Bogo Sort** - A highly inefficient sorting algorithm based on the generate and test paradigm (for educational purposes).

### Algorithm Complexity

| Algorithm      | Best Time      | Average Time   | Worst Time     | Space          | Stable |
|----------------|----------------|----------------|----------------|----------------|--------|
| Bubble Sort    | Ω(n)           | Θ(n²)          | O(n²)          | O(1)           | Yes    |
| Selection Sort | Ω(n²)          | Θ(n²)          | O(n²)          | O(1)           | No     |
| Insertion Sort | Ω(n)           | Θ(n²)          | O(n²)          | O(1)           | Yes    |
| Merge Sort     | Ω(n log n)     | Θ(n log n)     | O(n log n)     | O(n)           | Yes    |
| Quick Sort     | Ω(n log n)     | Θ(n log n)     | O(n²)          | O(log n)       | No     |
| Heap Sort      | Ω(n log n)     | Θ(n log n)     | O(n log n)     | O(1)           | No     |
| Shell Sort     | Ω(n log n)     | Θ(n log²n)     | O(n²)          | O(1)           | No     |
| Counting Sort  | Ω(n + k)       | Θ(n + k)       | O(n + k)       | O(k)           | Yes    |
| Radix Sort     | Ω(nk)          | Θ(nk)          | O(nk)          | O(n + k)       | Yes    |
| Bogo Sort      | Ω(n)           | Θ((n+1)!)      | O(∞)           | O(1)           | No     |

**Note:**
- n is the number of elements in the array
- k is the range of input (for Counting Sort) or number of digits (for Radix Sort)
- Bogo Sort is included for educational purposes only and should not be used in practice

## Performance Characteristics

The implementation of each algorithm in this project has been optimized for visualization purposes. Here are some key performance characteristics:

### Optimized Implementations

- **Quick Sort & Merge Sort**: Both algorithms use insertion sort for small subarrays (less than 10 elements) to improve performance.
- **Iterative Approach**: Quick Sort uses an iterative implementation with an explicit stack to reduce recursion overhead.
- **Median-of-Three Pivot**: Quick Sort uses median-of-three pivot selection to improve performance on partially sorted arrays.
- **Early Termination**: Merge Sort includes an optimization that skips merging if the two halves are already in order.

### Visualization-Friendly Design

Each algorithm implementation includes a `*SortSteps` variant that tracks every step of the sorting process, including:
- Comparisons between elements
- Swaps or shifts of elements
- Merge operations
- Insertion operations
- Informational messages about algorithm decisions

This design allows for detailed visualization of how each algorithm works, making it easier to understand their behavior and performance characteristics.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Wenaixi/Algorithm-demonstration.git
   ```

2. Navigate to the project directory:
   ```
   cd Algorithm-demonstration
   ```

3. Install dependencies:
   ```
   npm install --registry https://registry.npmmirror.com/
   ```

## Usage

To start the development server:
```
npm run dev
```

To build for production:
```
npm run build
```

To preview the production build:
```
npm run preview
```

### New Feature: Next Step Functionality

When a sorting algorithm is paused, you can now execute the next step manually using the "Next Step" button. This allows for a more detailed examination of how each algorithm works.

## Technologies Used

- React - JavaScript library for building user interfaces
- D3.js - Data visualization library for creating dynamic, interactive data visualizations
- Vite - Next generation frontend tooling for faster development and build times
- JavaScript (ES6+) - Modern JavaScript features for clean, efficient code
- CSS3 - For responsive design and custom styling
- ESLint - Code quality and consistency tool
- Jest - JavaScript testing framework (for algorithm verification)

## Development Setup

For local development and testing:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the displayed URL (usually http://localhost:3003)

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Deployment

The project can be easily deployed to various platforms:

### Vercel
1. Push your code to GitHub
2. Import the repository on Vercel
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to the `gh-pages` branch

## FAQ

### Q: Why does Bogo Sort take so long?
A: Bogo Sort has an average time complexity of O((n+1)!) and is included purely for educational purposes. It should never be used in practice.

### Q: Can I add my own sorting algorithm?
A: Yes! Follow the pattern used in the existing algorithms. Each algorithm should implement both a direct sort function and a `*SortSteps` variant for visualization.

### Q: How do I optimize the visualization speed?
A: Use the speed control slider in the interface. For faster testing, you can also reduce the array size.

### Q: Are the algorithms production-ready?
A: While the algorithms are correctly implemented, they include visualization overhead. For production use, consider using native JavaScript sort or optimized libraries.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Running the Tests

The project includes comprehensive tests for all implemented algorithms. The tests cover various scenarios including edge cases like empty arrays, single elements, and arrays with duplicate values.

To run the tests, you can execute the test file directly in a browser environment or Node.js:

```bash
# Run the tests in Node.js (if available)
node src/tests/algorithmTests.js

# Or open the test file in a browser
# You can create a simple HTML file to import and run the tests
```

The test suite includes the following test cases:
- Empty Array
- Single Element
- Two Elements
- Already Sorted
- Reverse Sorted
- Random Order
- Duplicates
- All Same Elements
- Negative Numbers
- Mixed Numbers (Positive, Negative, and Zero)

Each algorithm is tested against all these data sets to ensure correctness.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our contribution process and guidelines.

### Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

### How to Contribute

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Ensure your code passes all tests
5. Commit your changes with clear, descriptive messages
6. Push to your fork
7. Create a pull request

## Version History

- v1.0.0 - Initial release with 10 sorting algorithms and interactive visualization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of the algorithms visualized in this project
- Inspired by various algorithm visualization tools available online
