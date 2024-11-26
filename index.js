// program here

document.getElementById("newton-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const userFunction = document.getElementById("function").value;
    const derivativeFunction = document.getElementById("derivative").value;
    const a = parseFloat(document.getElementById("intervalA").value);
    const b = parseFloat(document.getElementById("intervalB").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);
    const maxIterations = parseInt(document.getElementById("maxIterations").value);

    // Validate inputs
    if (isNaN(a) || isNaN(b) || isNaN(tolerance) || isNaN(maxIterations)) {
        displayOutput("Error: Please enter valid numerical values");
        return;
    }

   // Modified function evaluators with better error handling and math.js parsing
const evaluateFunction = (x) => {
    try {
        // Create a scope with the x value
        const scope = {
            x: x
        };

        // Parse the function first
        const parsedFunction = math.parse(userFunction);
        
        // Compile and evaluate
        const compiledFunction = parsedFunction.compile();
        return compiledFunction.evaluate(scope);
    } catch (error) {
        throw new Error(`Invalid function expression: ${error.message}`);
    }
};

const evaluateDerivative = (x) => {
    try {
        // Create a scope with the x value
        const scope = {
            x: x
        };

        // Parse the derivative function first
        const parsedDerivative = math.parse(derivativeFunction);
        
        // Compile and evaluate
        const compiledDerivative = parsedDerivative.compile();
        return compiledDerivative.evaluate(scope);
    } catch (error) {
        throw new Error(`Invalid derivative expression: ${error.message}`);
    }
};

    // Clear and prepare output
    const output = document.getElementById("output");
    output.innerHTML = "";

    try {
        // Initial guess
        let x0 = (a + b) / 2;
        let iteration = 0;

        displayOutput(`Starting Newton's method with initial guess x0 = ${x0.toFixed(6)}\n`);

        while (iteration < maxIterations) {
            const f = evaluateFunction(x0);
            const fPrime = evaluateDerivative(x0);

            // Check for zero derivative
            if (Math.abs(fPrime) < tolerance) {
                displayOutput("Error: Derivative too close to zero. Method may fail.");
                return;
            }

            // Newton's formula
            const x1 = x0 - f / fPrime;
            
            // Display iteration results with formatted numbers
            displayOutput(`Iteration ${iteration + 1}: x = ${x1.toFixed(6)}, f(x) = ${f.toFixed(6)}`);

            // Check convergence
            if (Math.abs(x1 - x0) < tolerance) {
                displayOutput(`\nSuccess! Root found: x = ${x1.toFixed(6)} after ${iteration + 1} iterations`);
                displayOutput(`Function value at root: f(x) = ${evaluateFunction(x1).toFixed(6)}`);
                return;
            }

            x0 = x1;
            iteration++;
        }

        displayOutput("\nWarning: Newton's method did not converge within the maximum iterations");
        
    } catch (error) {
        displayOutput(`Error: ${error.message}`);
    }
});

// Helper function to display output
function displayOutput(message) {
    const output = document.getElementById("output");
    output.innerHTML += message + "\n";
}