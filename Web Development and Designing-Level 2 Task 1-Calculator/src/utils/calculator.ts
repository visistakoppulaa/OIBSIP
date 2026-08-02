/**
 * Custom Expression Parser & Calculation Engine (No eval())
 * Implements Tokenizer & Shunting-Yard Algorithm to evaluate infix mathematical expressions safely.
 */

export interface MathResult {
  result: string;
  isError: boolean;
  numericValue: number | null;
}

export type TokenType = 'NUMBER' | 'OPERATOR' | 'LPAREN' | 'RPAREN' | 'FUNCTION' | 'CONSTANT';

export interface Token {
  type: TokenType;
  value: string;
}

// Map user display symbols to standard internal operators
export function normalizeExpression(expr: string): string {
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'PI')
    .replace(/e/g, 'E')
    .replace(/√\(/g, 'sqrt(')
    .replace(/√([0-9.]+)/g, 'sqrt($1)');
}

// Format numbers for display without floating point noise like 0.30000000000000004
export function formatResultNumber(val: number): string {
  if (isNaN(val)) return 'Error';
  if (!isFinite(val)) return 'Overflow';
  
  // High precision rounder to trim floating-point rounding artifacts
  const precision = 12;
  const rounded = Number(Math.fround ? val.toFixed(10) : val);
  
  if (Math.abs(val) > 1e12 || (Math.abs(val) < 1e-6 && val !== 0)) {
    return val.toExponential(6).replace(/\.?0+e/, 'e');
  }
  
  const str = parseFloat(val.toFixed(precision)).toString();
  return str;
}

// Safe Operator Precedence & Associativity
const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
};

const RIGHT_ASSOCIATIVE: Record<string, boolean> = {
  '^': true,
};

const FUNCTIONS = new Set(['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'abs', 'fact']);

export function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const cleaned = normalizeExpression(expr);

  while (i < cleaned.length) {
    const char = cleaned[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Number matching (e.g. 12, 3.14)
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      while (i < cleaned.length && /[0-9.]/.test(cleaned[i])) {
        numStr += cleaned[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    // Constants
    if (cleaned.substring(i, i + 2) === 'PI') {
      tokens.push({ type: 'CONSTANT', value: Math.PI.toString() });
      i += 2;
      continue;
    }
    if (char === 'E' && (i === 0 || !/[0-9a-zA-Z]/.test(cleaned[i - 1]))) {
      tokens.push({ type: 'CONSTANT', value: Math.E.toString() });
      i++;
      continue;
    }

    // Function matching
    let matchedFn = false;
    for (const fn of FUNCTIONS) {
      if (cleaned.substring(i, i + fn.length) === fn) {
        tokens.push({ type: 'FUNCTION', value: fn });
        i += fn.length;
        matchedFn = true;
        break;
      }
    }
    if (matchedFn) continue;

    // Parentheses
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }
    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    // Unary minus vs Binary minus detection
    if (char === '-') {
      const prevToken = tokens[tokens.length - 1];
      const isUnary =
        !prevToken ||
        prevToken.type === 'OPERATOR' ||
        prevToken.type === 'LPAREN';

      if (isUnary) {
        // Unary minus treated as 0 - x or token with negative number if next is number
        if (i + 1 < cleaned.length && /[0-9.]/.test(cleaned[i + 1])) {
          let numStr = '-';
          i++;
          while (i < cleaned.length && /[0-9.]/.test(cleaned[i])) {
            numStr += cleaned[i];
            i++;
          }
          tokens.push({ type: 'NUMBER', value: numStr });
          continue;
        } else {
          // Push 0 then binary minus
          tokens.push({ type: 'NUMBER', value: '0' });
          tokens.push({ type: 'OPERATOR', value: '-' });
          i++;
          continue;
        }
      } else {
        tokens.push({ type: 'OPERATOR', value: '-' });
        i++;
        continue;
      }
    }

    // Binary Operators
    if (['+', '*', '/', '%', '^'].includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      i++;
      continue;
    }

    // Unexpected char -> skip to avoid crash
    i++;
  }

  return tokens;
}

// Shunting-Yard Algorithm to convert Infix tokens to RPN (Reverse Polish Notation)
export function parseInfixToRPN(tokens: Token[]): Token[] {
  const outputQueue: Token[] = [];
  const operatorStack: Token[] = [];

  for (const token of tokens) {
    if (token.type === 'NUMBER' || token.type === 'CONSTANT') {
      outputQueue.push(token);
    } else if (token.type === 'FUNCTION') {
      operatorStack.push(token);
    } else if (token.type === 'OPERATOR') {
      const o1 = token.value;
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.type === 'OPERATOR') {
          const o2 = top.value;
          const p1 = PRECEDENCE[o1] || 0;
          const p2 = PRECEDENCE[o2] || 0;

          if ((!RIGHT_ASSOCIATIVE[o1] && p1 <= p2) || (RIGHT_ASSOCIATIVE[o1] && p1 < p2)) {
            outputQueue.push(operatorStack.pop()!);
          } else {
            break;
          }
        } else if (top.type === 'FUNCTION') {
          outputQueue.push(operatorStack.pop()!);
        } else {
          break;
        }
      }
      operatorStack.push(token);
    } else if (token.type === 'LPAREN') {
      operatorStack.push(token);
    } else if (token.type === 'RPAREN') {
      let foundMatchingLparen = false;
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.type === 'LPAREN') {
          foundMatchingLparen = true;
          operatorStack.pop();
          break;
        } else {
          outputQueue.push(operatorStack.pop()!);
        }
      }
      if (!foundMatchingLparen) {
        throw new Error('Mismatched parentheses');
      }
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === 'FUNCTION') {
        outputQueue.push(operatorStack.pop()!);
      }
    }
  }

  while (operatorStack.length > 0) {
    const top = operatorStack.pop()!;
    if (top.type === 'LPAREN' || top.type === 'RPAREN') {
      throw new Error('Mismatched parentheses');
    }
    outputQueue.push(top);
  }

  return outputQueue;
}

// Helper for factorial
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Evaluate RPN Tokens
export function evaluateRPN(rpnTokens: Token[]): MathResult {
  const stack: number[] = [];

  for (const token of rpnTokens) {
    if (token.type === 'NUMBER' || token.type === 'CONSTANT') {
      const val = parseFloat(token.value);
      if (isNaN(val)) return { result: 'Invalid Number', isError: true, numericValue: null };
      stack.push(val);
    } else if (token.type === 'OPERATOR') {
      if (stack.length < 2) {
        return { result: 'Malformed Expression', isError: true, numericValue: null };
      }
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token.value) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          // Division by zero trap
          if (b === 0) {
            return { result: 'Cannot divide by 0', isError: true, numericValue: null };
          }
          stack.push(a / b);
          break;
        case '%':
          if (b === 0) {
            return { result: 'Cannot divide by 0', isError: true, numericValue: null };
          }
          stack.push(a % b);
          break;
        case '^':
          stack.push(Math.pow(a, b));
          break;
        default:
          return { result: 'Unknown Operator', isError: true, numericValue: null };
      }
    } else if (token.type === 'FUNCTION') {
      if (stack.length < 1) {
        return { result: 'Malformed Expression', isError: true, numericValue: null };
      }
      const a = stack.pop()!;
      switch (token.value) {
        case 'sqrt':
          if (a < 0) return { result: 'Invalid Input (Negative √)', isError: true, numericValue: null };
          stack.push(Math.sqrt(a));
          break;
        case 'sin':
          // Degrees mode vs radians - default standard math sin (radians)
          stack.push(Math.sin(a));
          break;
        case 'cos':
          stack.push(Math.cos(a));
          break;
        case 'tan':
          stack.push(Math.tan(a));
          break;
        case 'log':
          if (a <= 0) return { result: 'Invalid Log Input', isError: true, numericValue: null };
          stack.push(Math.log10(a));
          break;
        case 'ln':
          if (a <= 0) return { result: 'Invalid Ln Input', isError: true, numericValue: null };
          stack.push(Math.log(a));
          break;
        case 'abs':
          stack.push(Math.abs(a));
          break;
        case 'fact':
          const f = factorial(a);
          if (isNaN(f)) return { result: 'Invalid Factorial', isError: true, numericValue: null };
          stack.push(f);
          break;
        default:
          return { result: 'Unknown Function', isError: true, numericValue: null };
      }
    }
  }

  if (stack.length !== 1) {
    return { result: 'Invalid Expression', isError: true, numericValue: null };
  }

  const finalVal = stack[0];
  if (isNaN(finalVal)) {
    return { result: 'Result is undefined', isError: true, numericValue: null };
  }

  return {
    result: formatResultNumber(finalVal),
    isError: false,
    numericValue: finalVal,
  };
}

// Master Safe Expression Evaluator (No eval)
export function calculateExpression(expressionStr: string): MathResult {
  if (!expressionStr || expressionStr.trim() === '') {
    return { result: '0', isError: false, numericValue: 0 };
  }

  try {
    const tokens = tokenize(expressionStr);
    if (tokens.length === 0) {
      return { result: '0', isError: false, numericValue: 0 };
    }
    const rpn = parseInfixToRPN(tokens);
    return evaluateRPN(rpn);
  } catch (err: any) {
    return {
      result: err.message || 'Syntax Error',
      isError: true,
      numericValue: null,
    };
  }
}

// Sequential Chaining Calculator Helper
export function evaluateSequential(
  prevValue: number,
  nextValue: number,
  operator: string
): MathResult {
  switch (operator) {
    case '+':
      return { result: formatResultNumber(prevValue + nextValue), isError: false, numericValue: prevValue + nextValue };
    case '-':
    case '−':
      return { result: formatResultNumber(prevValue - nextValue), isError: false, numericValue: prevValue - nextValue };
    case '*':
    case '×':
      return { result: formatResultNumber(prevValue * nextValue), isError: false, numericValue: prevValue * nextValue };
    case '/':
    case '÷':
      if (nextValue === 0) {
        return { result: 'Cannot divide by 0', isError: true, numericValue: null };
      }
      return { result: formatResultNumber(prevValue / nextValue), isError: false, numericValue: prevValue / nextValue };
    case '%':
      if (nextValue === 0) {
        return { result: 'Cannot divide by 0', isError: true, numericValue: null };
      }
      return { result: formatResultNumber(prevValue % nextValue), isError: false, numericValue: prevValue % nextValue };
    case '^':
      return { result: formatResultNumber(Math.pow(prevValue, nextValue)), isError: false, numericValue: Math.pow(prevValue, nextValue) };
    default:
      return { result: formatResultNumber(nextValue), isError: false, numericValue: nextValue };
  }
}
