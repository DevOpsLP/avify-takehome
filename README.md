# UK Energy Mix Dashboard

This project visualizes the UK's energy generation mix using Recharts for interactive charts and Material-UI (MUI) for UI components. It fetches live data from the Carbon Intensity API and displays it in an intuitive and visually appealing format.

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/DevOpsLP/avify-takehome.git
   ```
2. Navigate to the project directory:
   ```sh
   cd avify-takehome
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run start
   ```
5. Visit the app in your browser at [http://localhost:8080](http://localhost:8080).

## Features

### Data Fetching

The energy generation data is fetched from the Carbon Intensity API using the following logic in the main `App.tsx` file:

- A `useEffect` hook is used to trigger the data fetch when the component loads.
- While fetching data, a Material-UI Circular Progress Loader is displayed to inform the user.
- The app gracefully handles errors, displaying an appropriate message if the fetch fails.

Key snippet from `App.tsx`:

```typescript
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://api.carbonintensity.org.uk/generation');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFromDate(data.data.from);
            setToDate(data.data.to);
            setGenerationMix(data.data.generationmix);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch energy generation data.');
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);
```

### Color Mapping

In the file `utils/iconMap.ts`, we have a color map (`COLOR_MAP`) that assigns specific colors to each energy source. These colors are customizable for future updates. The color map looks like this:

```typescript
export const COLOR_MAP: Record<string, string> = {
    biomass: '#5fbb4a',
    coal: '#000',
    gas: '#f7cac9',
    nuclear: '#92a8d1',
    hydro: '#955251',
    solar: '#b565a7',
    wind: '#009b77',
    imports: '#88b04b',
    others: '#daa520',
};
```

### Utility Functions

Several utility functions enhance the functionality and usability of the app:

- **Date Formatting**: ISO date strings are converted to a human-readable format using the `formatToLocal` function.
  - Example: `2023-12-01T10:15:30Z` becomes `December 1, 2023, 10:15:30 AM`.
- **Hex to RGBA Conversion**: Colors from the `COLOR_MAP` are converted to RGBA format with reduced opacity to create visually appealing donut chart effects.
- **Data Processing**: The `processData.ts` file ensures that 0% values are excluded from the bar chart for better visual appeal, but these values are still included in the grid of donut charts for completeness.

## Project Structure

The project follows a modular and scalable structure:

```
src/
├── components/       # React components for charts and UI
├── utils/            # Helper functions like color mapping and data processing
├── styles.css        # Global styles
├── App.tsx           # Main application file
└── index.tsx         # Entry point
```

## Configuration

### TypeScript Paths

To simplify imports, the `tsconfig.json` includes the following configuration:

```json
"baseUrl": "./",
"paths": {
    "@/*": ["src/*"]
}
```

This allows you to use imports like `@/utils/iconMap` instead of relative paths.

### Jest Test Environment

The jest script in the `package.json` ensures the tests run in a jsdom environment:

```json
"testEnvironment": "jsdom"
```

This is necessary for testing React components that interact with the DOM.

## Usage

- **Run the App**: Visit the running app at [http://localhost:8080](http://localhost:8080).
  - The loader indicates when data is being fetched.
- **Charts**:
  - The bar chart excludes 0% values for clarity.
  - The donut charts include all energy sources for a comprehensive view.
- **Customization**:
  - Colors can be modified in `utils/iconMap.ts`.
  - Data processing logic can be updated in `utils/processData.ts`.

## Dependencies

- **Recharts**: For rendering interactive charts.
- **Material-UI (MUI)**: For UI components like loaders and grids.

