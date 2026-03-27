# Appendix: Python Quick Reference Cheat Sheet

## Data Types

int (42), float (3.14), str (\"hello\"), bool (True/False), None, list (\[1,2,3\]), tuple ((1,2,3)), set ({1,2,3}), dict ({\"a\":1}).

## Common Built-in Functions

print(), input(), len(), type(), range(), enumerate(), zip(), map(), filter(), sorted(), reversed(), min(), max(), sum(), abs(), round(), isinstance(), id(), dir(), help().

## String Methods

.upper(), .lower(), .strip(), .split(), .join(), .replace(), .find(), .count(), .startswith(), .endswith(), .isdigit(), .isalpha(), .format().

## List Methods

.append(), .extend(), .insert(), .remove(), .pop(), .clear(), .index(), .count(), .sort(), .reverse(), .copy().

## Dict Methods

.get(), .keys(), .values(), .items(), .pop(), .update(), .setdefault(), .clear(), .copy().

## Useful Imports

> import math \# sqrt, ceil, floor, pi, log
>
> import random \# randint, choice, shuffle, sample
>
> import json \# load, dump, loads, dumps
>
> import csv \# reader, writer, DictReader, DictWriter
>
> import os \# path, listdir, getcwd, makedirs
>
> from pathlib import Path
>
> from datetime import datetime, timedelta
>
> from collections import Counter, defaultdict, namedtuple
>
> from functools import reduce
>
> from abc import ABC, abstractmethod

## OOP Quick Reference

class MyClass: — define a class. def \_\_init\_\_(self): — constructor. self.attr — instance attribute. \@classmethod — alternate constructor. \@staticmethod — utility method. \@property — read-only getter. super() — access parent class. ABC + \@abstractmethod — abstract interface.

End of Document. Happy coding!


---

# Chapter 1: Introduction to Python

## What is Python?

Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum and first released in 1991. It emphasizes code readability with its use of significant indentation and a clean, expressive syntax that lets you write programs in fewer lines than languages like C++ or Java.

Python is used across a wide range of domains: web development (Django, Flask), data science (Pandas, NumPy), machine learning (TensorFlow, PyTorch), automation and scripting, desktop applications, game development, and much more. Companies like Google, Netflix, Instagram, Spotify, and NASA use Python extensively in their technology stacks.

What makes Python stand out from other languages is its philosophy of simplicity. The language was designed with the idea that code is read far more often than it is written, so clarity matters more than cleverness. This philosophy is captured in "The Zen of Python" — a collection of guiding principles you can read by typing import this in the Python interpreter.

## Why Learn Python?

There are several compelling reasons to learn Python, whether you are a complete beginner or an experienced developer looking to expand your toolkit:

-   Beginner-friendly syntax that reads almost like English — you can focus on learning programming concepts rather than fighting with complicated syntax rules.

-   Massive ecosystem of libraries and frameworks — whatever you want to build, there is likely a Python library that gets you halfway there.

-   Strong community support with thousands of tutorials, Stack Overflow answers, and open-source projects to learn from.

-   Cross-platform compatibility — Python runs on Windows, macOS, and Linux without modification.

-   High demand in the job market across data science, backend engineering, DevOps, AI/ML, and more.

-   Versatile — the same language takes you from a 5-line automation script to a large-scale enterprise application.

## Installing Python

To start writing Python code, you first need to install the Python interpreter on your machine. Visit python.org and download the latest Python 3.x version for your operating system.

On Windows, the installer will show a checkbox that says "Add Python to PATH." Make sure you check this box — it allows you to run Python from any terminal window. Without it, your system will not know where to find the python command. On macOS and Linux, Python often comes pre-installed, but the pre-installed version may be outdated. You can check your version and update if needed.

After installation, open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and verify the installation by running:

> python \--version
>
> \# Output: Python 3.12.x (or similar)

If you see a version number starting with 3, you are all set. If you see Python 2.x or an error, you may need to use python3 instead of python, or revisit your installation steps.

## Your First Python Program

Traditionally, the very first program in any language prints "Hello, World!" to the screen. In Python, this is a single line of code:

> print(\"Hello, World!\")

Let us break this down. print() is a built-in function that outputs text to the console. The parentheses tell Python that we are calling (executing) this function. Inside the parentheses, we pass the text we want to display, enclosed in double quotes. This quoted text is called a string — a sequence of characters.

To run this program, save the line above in a file called hello.py (the .py extension tells your system this is a Python file), then run it from the terminal:

> python hello.py
>
> \# Output: Hello, World!

Congratulations — you have just written and executed your first Python program. Every program you will ever write, no matter how complex, builds on these fundamentals: writing instructions in a file and asking Python to execute them.

## How Python Executes Code

Python is an interpreted language, which means you do not need to compile your code into machine code before running it (unlike languages such as C or Java). When you run a .py file, the following happens behind the scenes:

First, the Python interpreter reads your source code line by line and checks it for syntax errors. If the code is valid, it compiles it into bytecode — an intermediate, platform-independent representation that is not human-readable. This bytecode is then executed by the Python Virtual Machine (PVM), which translates each bytecode instruction into operations your computer's processor understands.

This interpretation model makes Python excellent for rapid prototyping, scripting, and iterative development — you change a line of code and immediately see the result. The trade-off is that Python can be slower than compiled languages for compute-heavy tasks, though in practice this rarely matters for most applications, and libraries like NumPy handle performance-critical operations in optimized C code under the hood.

## Python Interactive Shell (REPL)

Python comes with an interactive shell, also known as REPL, which stands for Read-Eval-Print Loop. You can start it by typing python (or python3) in your terminal with no filename. The shell reads what you type, evaluates it immediately, prints the result, and loops back to wait for your next input.

> \>\>\> 2 + 3
>
> 5
>
> \>\>\> print(\"Hello from REPL!\")
>
> Hello from REPL!
>
> \>\>\> type(42)
>
> \<class \'int\'\>

In the example above, the \>\>\> symbols are Python's prompt, indicating it is waiting for your input. When you type 2 + 3, Python evaluates the arithmetic expression and prints the result 5. The print() function outputs a string, and type() tells you the data type of a value — here, 42 is an int (integer).

The REPL is incredibly useful for quick experiments, testing small snippets, and exploring how Python works. Think of it as a calculator on steroids. Type exit() or press Ctrl+D (Ctrl+Z on Windows) to leave the REPL and return to your normal terminal.

## Comments in Python

Comments are notes you write inside your code that the Python interpreter completely ignores. They exist purely for humans — to explain what your code does, why a certain decision was made, or to temporarily disable a line of code during debugging.

> \# This is a single-line comment
>
> \"\"\"
>
> This is a multi-line comment (docstring).
>
> Used to describe modules, functions, or classes.
>
> \"\"\"
>
> x = 10 \# Inline comment: assigning 10 to x

Single-line comments start with the \# symbol. Everything after \# on that line is ignored by Python. You can place them on their own line or at the end of a line of code (inline comment).

Multi-line comments use triple quotes (either triple double-quotes or triple single-quotes). When placed at the top of a module, function, or class, they are called docstrings (documentation strings) and can be accessed programmatically with Python's help() system. We will explore docstrings more in the Functions chapter.

Writing good comments is a professional skill. The best comments explain why something is done, not what is done — because the code itself should be clear enough to explain the what.

## Python Indentation

This is one of the most important concepts for anyone new to Python. Unlike most programming languages that use braces {} to define blocks of code (like C, Java, or JavaScript), Python uses indentation — the whitespace at the beginning of a line. This is not optional or cosmetic; it is part of the language's syntax.

> if True:
>
> print(\"This is indented correctly\")
>
> print(\"Same block\")
>
> \# This would cause an IndentationError:
>
> \# if True:
>
> \# print(\"Wrong!\")

In the correct example, both print() statements are indented by exactly 4 spaces (the Python standard). This tells Python that both statements belong to the if block. In the wrong example, the print() is at the same level as the if statement, so Python does not know it is supposed to be inside the if block and raises an IndentationError.

The key rules are: use 4 spaces per indentation level (not tabs, though technically both work — never mix them), and every line in the same block must have the same indentation. Your code editor should handle this automatically if you configure it for Python development.

## Practice Exercises

**Exercise 1:** Write a Python program that prints your name, your age, and your favourite programming language on three separate lines.

**Hint:** *Use three separate print() statements, one for each line. Each string goes inside quotes within the print() parentheses.*

## Solution:

> print(\"Harsh\")
>
> print(\"22\")
>
> print(\"Python\")

**Exercise 2:** Open the Python REPL and calculate the result of 17 \* 23 + 45 - 12. What is the output?

**Hint:** *Just type the mathematical expression directly into the REPL after the \>\>\> prompt. Python follows standard mathematical order of operations (multiplication before addition/subtraction).*

## Solution:

> \>\>\> 17 \* 23 + 45 - 12
>
> 424
>
> \# Explanation: 17\*23 = 391, then 391+45 = 436, then 436-12 = 424

**Exercise 3:** Write a program that includes at least one single-line comment and one multi-line comment (docstring), then prints \"Python is fun!\".

**Hint:** *Use \# for single-line and triple quotes for multi-line comments. Remember, comments are ignored by Python — only the print() will produce output.*

## Solution:

> \"\"\"
>
> This program demonstrates comments in Python.
>
> It prints a simple message to the console.
>
> \"\"\"
>
> \# Print a motivational message
>
> print(\"Python is fun!\")


---

# Chapter 2: Variables, Data Types & Operators

## Variables

A variable is a name that refers to a value stored in your computer's memory. Think of it as a labeled box: the label is the variable name, and the content inside is the value. In Python, you create a variable simply by assigning a value to a name using the = operator. You do not need to declare the variable's type beforehand — Python figures it out automatically from the value you assign. This is called dynamic typing.

> name = \"Alice\" \# str
>
> age = 25 \# int
>
> height = 5.7 \# float
>
> is_student = True \# bool

In this example, we created four variables. Python looked at the value on the right side of each = and determined the type automatically: \"Alice\" is a string (text), 25 is an integer (whole number), 5.7 is a float (decimal number), and True is a boolean (true/false value). The comments on the right show the type, but Python does not need them — they are just for our reference.

Variable naming rules: names must start with a letter or underscore (\_), can contain letters, digits, and underscores, and are case-sensitive (age, Age, and AGE are three different variables). Python convention uses snake_case for variable names, meaning lowercase words separated by underscores (e.g., my_variable, total_count, user_input). Avoid starting names with underscores unless you understand the convention, and never use Python's reserved keywords (like if, for, class, return) as variable names.

## Core Data Types

## Integers (int)

Integers are whole numbers without a decimal point. They can be positive, negative, or zero. One of Python's strengths is that integers have arbitrary precision — they can be as large as your computer's memory allows, unlike many other languages that cap integers at 32 or 64 bits.

> x = 42
>
> big_num = 999999999999999999999
>
> negative = -17
>
> print(type(x)) \# \<class \'int\'\>

The type() function is your best friend when learning Python. It tells you exactly what data type a value or variable holds. Here, type(x) returns \<class \'int\'\>, confirming that x is an integer. Notice that big_num has no upper limit — Python handles arbitrarily large numbers without any special syntax.

## Floating-Point Numbers (float)

Floats are numbers with a decimal point. Internally, Python stores them using 64-bit double-precision format (IEEE 754 standard), which gives you about 15--17 significant decimal digits of precision. This is important to understand because it means some decimal numbers cannot be represented exactly in binary.

> pi = 3.14159
>
> temp = -40.0
>
> scientific = 2.5e3 \# 2500.0
>
> print(0.1 + 0.2) \# 0.30000000000000004 (floating-point quirk)

The variable pi stores a decimal approximation of the mathematical constant. The temp variable shows that floats can be negative. The scientific variable uses scientific notation: 2.5e3 means 2.5 times 10 to the power of 3, which equals 2500.0.

The last line is crucial for every programmer to understand: 0.1 + 0.2 does not equal exactly 0.3 in floating-point arithmetic. This is not a Python bug — it happens in virtually every programming language because 0.1 cannot be represented exactly in binary. If you need exact decimal arithmetic (e.g., for financial calculations), use Python's decimal module.

## Strings (str)

Strings are sequences of characters — text data. You can create them with single quotes, double quotes, or triple quotes. Both single and double quotes work identically; triple quotes allow strings that span multiple lines. Strings in Python are immutable, meaning once a string is created, you cannot change individual characters in it — you can only create new strings.

> single = \'Hello\'
>
> double = \"World\"
>
> multi = \"\"\"This spans
>
> multiple lines\"\"\"
>
> \# String concatenation and repetition
>
> greeting = \"Hello\" + \" \" + \"World\" \# \"Hello World\"
>
> echo = \"Ha\" \* 3 \# \"HaHaHa\"

The + operator, when used with strings, concatenates (joins) them together. So \"Hello\" + \" \" + \"World\" produces \"Hello World\". The \* operator, when used with a string and an integer, repeats the string that many times: \"Ha\" \* 3 produces \"HaHaHa\". These operators behave differently depending on the data type — this is called operator overloading, and you will encounter it again in the OOP chapter.

## Booleans (bool)

Booleans represent one of two values: True or False. They are used in conditions, comparisons, and logical operations. An interesting Python detail: bool is actually a subclass of int, where True is equivalent to 1 and False is equivalent to 0. This means you can use booleans in arithmetic.

> is_active = True
>
> is_deleted = False
>
> print(True + True) \# 2
>
> print(type(False)) \# \<class \'bool\'\>

Since True equals 1 and False equals 0, the expression True + True is effectively 1 + 1, which gives 2. This is occasionally useful — for example, you can count how many conditions are True in a list by using sum() on a list of booleans.

## NoneType

None is Python's special null value. It represents the intentional absence of a value or a "nothing here yet" placeholder. Functions that do not explicitly return something return None by default. It is commonly used to initialize variables that will be assigned a real value later.

> result = None
>
> print(result) \# None
>
> print(type(result)) \# \<class \'NoneType\'\>

Note that None is not the same as 0, an empty string \"\", or False. It is its own unique type (NoneType) and its own unique value. When checking for None, always use is None rather than == None — this is a Python best practice because is checks identity (is it the exact same object?) while == checks equality (do they have the same value?).

## Type Conversion (Casting)

Sometimes you need to convert a value from one type to another. Python provides built-in functions for this, and the process is called type casting. This is especially important when working with user input, which always comes in as a string.

> int(\"42\") \# 42 (str to int)
>
> float(42) \# 42.0 (int to float)
>
> str(42) \# \"42\" (int to str)
>
> bool(0) \# False (0 is falsy)
>
> bool(1) \# True (non-zero is truthy)
>
> bool(\"\") \# False (empty string is falsy)
>
> bool(\"hello\") \# True (non-empty string is truthy)

int(\"42\") takes the string \"42\" and converts it to the integer 42. But int(\"hello\") would crash with a ValueError because \"hello\" cannot be interpreted as a number. The bool() conversions reveal an important Python concept called truthiness: every value in Python is either "truthy" (treated as True in a boolean context) or "falsy" (treated as False). The falsy values are: 0, 0.0, \"\" (empty string), \[\] (empty list), {} (empty dict), None, and False itself. Everything else is truthy.

## Input from the User

The input() function pauses your program and waits for the user to type something and press Enter. It always returns a string, even if the user types a number. This means you must cast the result if you want to use it as a number.

> name = input(\"Enter your name: \")
>
> age = int(input(\"Enter your age: \"))
>
> print(f\"Hello {name}, you are {age} years old!\")

In the first line, input() displays the prompt \"Enter your name: \" and waits. Whatever the user types is stored in the name variable as a string. In the second line, we wrap input() inside int() to convert the typed string into an integer immediately. The third line uses an f-string (which we will explore below) to embed the variables inside a formatted message. If the user types something non-numeric for the age prompt, the program will crash with a ValueError — we will learn how to handle that gracefully in the Error Handling chapter.

## Arithmetic Operators

Python supports all the standard arithmetic operations, plus a few extras that are especially useful in programming. Let us walk through each one:

> a, b = 17, 5
>
> print(a + b) \# 22 Addition
>
> print(a - b) \# 12 Subtraction
>
> print(a \* b) \# 85 Multiplication
>
> print(a / b) \# 3.4 True Division (always returns float)
>
> print(a // b) \# 3 Floor Division (rounds down)
>
> print(a % b) \# 2 Modulus (remainder)
>
> print(a \*\* b) \# 1419857 Exponentiation

The first line uses tuple unpacking to assign 17 to a and 5 to b in a single line. The key operators to understand are: / (true division) always returns a float, even if the result is a whole number (e.g., 10 / 2 returns 5.0, not 5). // (floor division) divides and rounds the result down to the nearest integer. % (modulus) returns the remainder after division — 17 divided by 5 is 3 with a remainder of 2. \*\* is exponentiation, so 17 \*\* 5 means 17 to the power of 5.

Modulus is one of the most useful operators in programming. Common use cases include checking if a number is even (n % 2 == 0), wrapping values around a range (like clock arithmetic), and extracting digits from numbers.

## Comparison Operators

Comparison operators compare two values and return a boolean (True or False). They are essential for making decisions in your code.

> x, y = 10, 20
>
> print(x == y) \# False Equal to
>
> print(x != y) \# True Not equal to
>
> print(x \> y) \# False Greater than
>
> print(x \< y) \# True Less than
>
> print(x \>= 10) \# True Greater than or equal
>
> print(x \<= 5) \# False Less than or equal

Notice that == (double equals) is the comparison operator, while = (single equals) is the assignment operator. This is a common source of bugs for beginners: if x = 5 would assign 5 to x, while if x == 5 checks whether x is equal to 5. Python also supports chained comparisons, which is a neat feature: 1 \< x \< 10 is valid Python and checks whether x is between 1 and 10 (exclusive).

## Logical Operators

Logical operators combine multiple boolean expressions. Python uses the English words and, or, and not instead of symbols like &&, \|\|, and !.

> a, b = True, False
>
> print(a and b) \# False (both must be True)
>
> print(a or b) \# True (at least one True)
>
> print(not a) \# False (inverts the value)
>
> \# Short-circuit evaluation:
>
> \# \'and\' stops at first False, \'or\' stops at first True
>
> print(0 and 42) \# 0 (0 is falsy, returns it immediately)
>
> print(0 or 42) \# 42 (0 is falsy, checks next value)

The and operator returns True only if both operands are True. The or operator returns True if at least one operand is True. The not operator flips the boolean value.

The short-circuit behavior is important: Python does not evaluate the second operand if the first one already determines the result. With and, if the first value is falsy, Python returns it immediately without checking the second (because the overall result must be False regardless). With or, if the first value is truthy, Python returns it immediately (because the overall result is True regardless). This is not just an optimization — it is a feature you can exploit, for example: result = user_input or \"default_value\" assigns user_input if it is truthy, otherwise \"default_value\".

## Assignment Operators

Assignment operators are shorthand for performing an operation and assigning the result back to the same variable. They save typing and make code more readable.

> x = 10
>
> x += 5 \# x = x + 5 -\> 15
>
> x -= 3 \# x = x - 3 -\> 12
>
> x \*= 2 \# x = x \* 2 -\> 24
>
> x /= 4 \# x = x / 4 -\> 6.0
>
> x //= 2 \# x = x // 2 -\> 3.0
>
> x %= 2 \# x = x % 2 -\> 1.0
>
> x \*\*= 3 \# x = x \*\* 3 -\> 1.0

Each of these operators takes the current value of x, performs the operation with the right-hand value, and stores the result back in x. For example, x += 5 is exactly equivalent to x = x + 5. Notice that once x /= 4 is executed, x becomes a float (6.0), and it stays a float for the remaining operations. This is because true division (/) always produces a float in Python.

## String Formatting (f-strings)

f-strings (formatted string literals), introduced in Python 3.6, are the most modern and readable way to embed expressions inside strings. You create them by prefixing a string with the letter f, then placing any Python expression inside curly braces {}.

> name = \"Alice\"
>
> age = 30
>
> score = 95.678
>
> print(f\"Name: {name}\")
>
> print(f\"Age next year: {age + 1}\")
>
> print(f\"Score: {score:.2f}\") \# 2 decimal places -\> 95.68
>
> print(f\"{\'Hello\':\>20}\") \# Right-align in 20 chars
>
> print(f\"{\'Hello\':\<20}\") \# Left-align in 20 chars
>
> print(f\"{\'Hello\':\^20}\") \# Center in 20 chars

The f before the opening quote is what makes this an f-string. Inside the curly braces, you can put any valid Python expression: a variable name like {name}, an arithmetic expression like {age + 1}, or a formatted output like {score:.2f} where .2f means "format as a floating-point number with exactly 2 decimal places." The alignment operators (\>, \<, \^) right-align, left-align, and center text within a specified width. These formatting options make f-strings incredibly versatile for generating reports, logs, and formatted output.

## Practice Exercises

**Exercise 1:** Write a program that asks the user for two numbers and prints their sum, difference, product, and quotient.

**Hint:** *Use float() to convert the input, since the user might enter decimal numbers. Remember that input() always returns a string, so you must cast it. Use f-strings to format the output nicely.*

## Solution:

> a = float(input(\"Enter first number: \"))
>
> b = float(input(\"Enter second number: \"))
>
> print(f\"Sum: {a + b}\")
>
> print(f\"Difference: {a - b}\")
>
> print(f\"Product: {a \* b}\")
>
> print(f\"Quotient: {a / b}\")

**Exercise 2:** Create variables for a product's name (str), price (float), quantity (int), and whether it is in stock (bool). Print all details using an f-string.

**Hint:** *Declare each variable on a separate line with an appropriate value. In the f-string, use {price:.2f} to show the price with exactly two decimal places.*

## Solution:

> product_name = \"Wireless Headphones\"
>
> price = 79.99
>
> quantity = 150
>
> in_stock = True
>
> print(f\"Product: {product_name}\")
>
> print(f\"Price: \${price:.2f}\")
>
> print(f\"Quantity: {quantity}\")
>
> print(f\"In Stock: {in_stock}\")

**Exercise 3:** Write a temperature converter: ask the user for a temperature in Celsius and convert it to Fahrenheit. Formula: F = (C × 9/5) + 32.

**Hint:** *Get input as float, apply the formula, and display the result rounded to 2 decimal places using f-string formatting with :.2f.*

## Solution:

> celsius = float(input(\"Enter temperature in Celsius: \"))
>
> fahrenheit = (celsius \* 9/5) + 32
>
> print(f\"{celsius}°C = {fahrenheit:.2f}°F\")

**Exercise 4:** What will the following expressions evaluate to? Predict first, then verify in the REPL: (a) 15 // 4, (b) 15 % 4, (c) 2 \*\* 10, (d) bool(\"\"), (e) bool(\"0\").

**Hint:** *Remember: // is floor division (rounds down), % is modulus (remainder). For booleans, empty string is falsy, but the string \"0\" is non-empty and therefore truthy.*

## Solution:

> \# (a) 15 // 4 -\> 3 (floor div: 15/4 = 3.75, rounded down = 3)
>
> \# (b) 15 % 4 -\> 3 (remainder: 15 = 4\*3 + 3)
>
> \# (c) 2 \*\* 10 -\> 1024 (2 to the power 10)
>
> \# (d) bool(\"\") -\> False (empty string is falsy)
>
> \# (e) bool(\"0\") -\> True (\"0\" is non-empty, so truthy!)


---

# Chapter 3: Control Flow

Up to this point, every line of code we have written executes sequentially — top to bottom, one after another. But real programs need to make decisions and repeat actions. Control flow statements let your program choose which code to execute (conditionals) and how many times to execute it (loops). Mastering control flow is what separates writing simple scripts from writing real programs.

## Conditional Statements

Conditional statements let your program make decisions based on whether a condition is true or false. Python uses the keywords if, elif (short for "else if"), and else.

## The if Statement

The simplest conditional checks a single condition. If the condition evaluates to True, the indented block of code underneath runs. If it evaluates to False, the block is skipped entirely.

> age = 18
>
> if age \>= 18:
>
> print(\"You are an adult.\")

Here, Python evaluates the expression age \>= 18. Since age is 18, the condition is True, so the indented print() statement executes. If age were 15, the condition would be False and the print() would be skipped. Notice the colon (:) at the end of the if line — this is required syntax in Python. The colon signals that an indented block follows.

**if-else**

When you want to do one thing if a condition is true and something different if it is false, add an else clause:

> temperature = 35
>
> if temperature \> 30:
>
> print(\"It is hot outside.\")
>
> else:
>
> print(\"The weather is pleasant.\")

Exactly one of the two blocks will execute — never both, never neither. If temperature is greater than 30, the first block runs. Otherwise (for any value of 30 or less), the else block runs. This is a fundamental pattern you will use constantly.

**if-elif-else Chain**

When you have multiple conditions to check, use elif (else if). Python evaluates them from top to bottom and executes the first matching block. Once a match is found, all remaining conditions are skipped.

> score = 85
>
> if score \>= 90:
>
> grade = \"A\"
>
> elif score \>= 80:
>
> grade = \"B\"
>
> elif score \>= 70:
>
> grade = \"C\"
>
> elif score \>= 60:
>
> grade = \"D\"
>
> else:
>
> grade = \"F\"
>
> print(f\"Your grade: {grade}\") \# Your grade: B

With a score of 85, Python first checks score \>= 90 (False), then score \>= 80 (True). Since the second condition matches, grade is set to \"B\" and all remaining elif/else blocks are skipped. The else at the bottom is a catch-all that handles any score below 60. The order of conditions matters: if you checked score \>= 70 before score \>= 80, an 85 would incorrectly get a C grade because the 70 check would match first.

## Nested Conditions

You can place if statements inside other if statements. This is useful when a second decision depends on the first one being true.

> age = 25
>
> has_license = True
>
> if age \>= 18:
>
> if has_license:
>
> print(\"You can drive.\")
>
> else:
>
> print(\"Get a license first.\")
>
> else:
>
> print(\"Too young to drive.\")

The outer if checks the age. Only if the person is 18 or older does Python enter the inner block and check for a license. If age is below 18, the inner block is never reached. While nesting works, deeply nested code (3+ levels) becomes hard to read. In those cases, consider using logical operators (and, or) to combine conditions into a single if statement, or breaking the logic into functions.

## Ternary Operator (Conditional Expression)

Python supports a compact one-line conditional expression, sometimes called the ternary operator. It is useful for simple assignments where a full if-else block would be verbose:

> age = 20
>
> status = \"adult\" if age \>= 18 else \"minor\"
>
> print(status) \# adult

This reads almost like English: "status is \'adult\' if age is at least 18, otherwise \'minor\'." The value before if is returned when the condition is True; the value after else is returned when False. Use this for simple cases only — if the logic is complex, a regular if-else is more readable.

## The match Statement (Python 3.10+)

Introduced in Python 3.10, structural pattern matching is Python's equivalent of a switch-case statement, but significantly more powerful. It matches a value against multiple patterns and executes the corresponding block.

> command = \"quit\"
>
> match command:
>
> case \"start\":
>
> print(\"Starting\...\")
>
> case \"stop\":
>
> print(\"Stopping\...\")
>
> case \"quit\" \| \"exit\":
>
> print(\"Goodbye!\")
>
> case \_:
>
> print(\"Unknown command\")

The match keyword takes a value (here, command), and each case checks if the value matches a pattern. The \| operator in the third case means "or" — it matches either \"quit\" or \"exit\". The underscore \_ is a wildcard that matches anything, acting as a default/catch-all case. Unlike switch in C or Java, Python's match does not "fall through" to the next case — once a match is found, only that block executes.

## Loops

Loops let you repeat a block of code multiple times. Python has two types of loops: for (when you know the number of iterations or are iterating over a collection) and while (when you want to repeat until a condition becomes false).

## The for Loop

The for loop iterates over any iterable object — a list, string, range, tuple, set, dictionary, file, or any object that supports iteration. On each iteration, the loop variable takes on the next value from the iterable.

> \# Iterating over a list
>
> fruits = \[\"apple\", \"banana\", \"cherry\"\]
>
> for fruit in fruits:
>
> print(f\"I like {fruit}\")
>
> \# Iterating over a string (character by character)
>
> for char in \"Python\":
>
> print(char, end=\" \") \# P y t h o n

In the first loop, fruit is the loop variable. On the first iteration, it holds \"apple\"; on the second, \"banana\"; on the third, \"cherry\". The loop body (the indented print statement) executes once for each item. In the second loop, Python iterates over each character of the string \"Python\". The end=\" \" argument to print() replaces the default newline with a space, so all characters print on one line.

## The range() Function

range() is one of the most commonly used functions with for loops. It generates a sequence of numbers on demand (lazily, without creating the full list in memory). It accepts up to three arguments: start (inclusive, default 0), stop (exclusive), and step (default 1).

> \# range(stop) - starts at 0, counts up to stop-1
>
> for i in range(5): \# 0, 1, 2, 3, 4
>
> print(i, end=\" \")
>
> \# range(start, stop) - starts at start, counts up to stop-1
>
> for i in range(2, 6): \# 2, 3, 4, 5
>
> print(i, end=\" \")
>
> \# range(start, stop, step) - counts by step
>
> for i in range(0, 10, 2): \# 0, 2, 4, 6, 8
>
> print(i, end=\" \")
>
> \# Counting backwards with a negative step
>
> for i in range(5, 0, -1): \# 5, 4, 3, 2, 1
>
> print(i, end=\" \")

The most important thing to remember about range() is that the stop value is exclusive — range(5) gives you 0 through 4, not 0 through 5. This design is intentional: range(len(my_list)) gives you valid indices for any list. With a step of 2, range(0, 10, 2) generates only even numbers. A negative step counts backwards: range(5, 0, -1) counts from 5 down to 1.

## The while Loop

A while loop runs its body repeatedly as long as its condition remains True. The condition is checked before each iteration, so if it starts as False, the loop body never executes. You must ensure the condition eventually becomes False, or you will have an infinite loop that hangs your program.

> count = 0
>
> while count \< 5:
>
> print(f\"Count: {count}\")
>
> count += 1 \# CRUCIAL: without this, infinite loop!
>
> \# Practical: input validation loop
>
> while True:
>
> age = input(\"Enter your age: \")
>
> if age.isdigit() and int(age) \> 0:
>
> age = int(age)
>
> break
>
> print(\"Please enter a valid positive number.\")

In the first example, count starts at 0. Each iteration prints the count and increments it. When count reaches 5, the condition count \< 5 becomes False and the loop exits. The count += 1 line is critical — without it, count would stay 0 forever and the condition would always be True.

The second example shows a common pattern: a while True loop for input validation. Since the condition is always True, this loop would run forever — except we use break to exit it when valid input is received. The .isdigit() method checks if the string contains only digits, and we also verify the number is positive. This pattern keeps asking until the user provides correct input.

**break, continue, and else in Loops**

Python provides three special statements for controlling loop behavior: break exits the entire loop immediately, continue skips the rest of the current iteration and jumps to the next one, and the else clause on a loop runs only if the loop completed without hitting a break.

> \# break: exit the loop when first even number found
>
> for num in \[1, 3, 4, 7, 8\]:
>
> if num % 2 == 0:
>
> print(f\"First even: {num}\") \# 4
>
> break
>
> \# continue: skip odd numbers, process only evens
>
> for num in range(10):
>
> if num % 2 != 0:
>
> continue \# Skip to next iteration
>
> print(num, end=\" \") \# 0 2 4 6 8
>
> \# for-else: the else runs ONLY if no break occurred
>
> n = 17
>
> for i in range(2, n):
>
> if n % i == 0:
>
> print(f\"{n} is not prime\")
>
> break
>
> else:
>
> print(f\"{n} is prime!\") \# 17 is prime!

In the break example, the loop stops as soon as it finds 4 (the first even number). Numbers 7 and 8 are never checked. In the continue example, when a number is odd, continue causes Python to skip the print() and jump directly to the next iteration.

The for-else construct is unique to Python and often confuses newcomers. Think of it this way: the else block runs if the loop finished normally (without breaking). In the prime-checking example, the loop tests whether n is divisible by any number from 2 to n-1. If it finds a divisor, it prints "not prime" and breaks — so the else block is skipped. If the loop completes all iterations without finding a divisor (no break), the else block runs and declares the number prime.

## Nested Loops

You can place loops inside loops. The inner loop completes all its iterations for each single iteration of the outer loop. Nested loops are useful for working with multi-dimensional data like matrices, grids, and tables.

> \# Multiplication table (1-5)
>
> for i in range(1, 6):
>
> for j in range(1, 6):
>
> print(f\"{i\*j:4}\", end=\"\")
>
> print() \# New line after each row

The outer loop variable i goes from 1 to 5. For each value of i, the inner loop variable j also goes from 1 to 5. So when i=1, the inner loop prints 1\*1, 1\*2, 1\*3, 1\*4, 1\*5. Then i becomes 2, and the inner loop prints 2\*1 through 2\*5, and so on. The :4 in the f-string pads each number to 4 characters wide so the columns align neatly. The print() after the inner loop starts a new line for the next row.

## Comprehensions (Preview)

Python has a powerful shorthand for creating lists (and sets, and dicts) from loops. They are called comprehensions, and they let you write in one line what would normally take three or four lines with a regular loop. We will cover these extensively in the Data Structures chapter, but here is a taste:

> \# List comprehension: squares of 0-9
>
> squares = \[x\*\*2 for x in range(10)\]
>
> print(squares) \# \[0, 1, 4, 9, 16, 25, 36, 49, 64, 81\]
>
> \# With a condition: only even squares
>
> even_squares = \[x\*\*2 for x in range(10) if x % 2 == 0\]
>
> print(even_squares) \# \[0, 4, 16, 36, 64\]

The first comprehension reads as: "create a list of x squared, for each x in range(10)." The second adds a filter: "create a list of x squared, for each x in range(10), but only if x is even." These are equivalent to writing a for loop with an append, but are more concise and often faster.

## Practice Exercises

**Exercise 1:** Write a program that asks the user for a number and prints whether it is positive, negative, or zero.

**Hint:** *Use if-elif-else. Convert the input to a number first with int() or float(). There are exactly three cases to check: greater than 0, less than 0, or exactly 0.*

## Solution:

> num = float(input(\"Enter a number: \"))
>
> if num \> 0:
>
> print(\"Positive\")
>
> elif num \< 0:
>
> print(\"Negative\")
>
> else:
>
> print(\"Zero\")

**Exercise 2:** Write a program that prints the Fibonacci sequence up to n terms. For n=10, the output should be: 0 1 1 2 3 5 8 13 21 34.

**Hint:** *Use two variables a and b initialized to 0 and 1. In each iteration, print a, then simultaneously update both: a becomes b, and b becomes a+b. Python's tuple unpacking (a, b = b, a+b) makes this elegant.*

## Solution:

> n = int(input(\"Enter number of terms: \"))
>
> a, b = 0, 1
>
> for \_ in range(n):
>
> print(a, end=\" \")
>
> a, b = b, a + b
>
> \# The \_ variable name signals we don\'t use the loop index

**Exercise 3:** Write a number-guessing game: generate a random number between 1 and 100, and let the user guess until they get it right. Give \"Too high\" or \"Too low\" hints after each guess.

**Hint:** *Use import random and random.randint(1, 100) to generate the secret number. Use a while True loop with break when they guess correctly. Track attempts with a counter variable.*

## Solution:

> import random
>
> secret = random.randint(1, 100)
>
> attempts = 0
>
> while True:
>
> guess = int(input(\"Guess the number (1-100): \"))
>
> attempts += 1
>
> if guess \< secret:
>
> print(\"Too low!\")
>
> elif guess \> secret:
>
> print(\"Too high!\")
>
> else:
>
> print(f\"Correct! You got it in {attempts} attempts.\")
>
> break

**Exercise 4:** Write a program that prints the following right-triangle star pattern for n=5: \* \*\* \*\*\* \*\*\*\* \*\*\*\*\*

**Hint:** *Use a for loop with range(1, n+1). In each iteration, print the star character multiplied by the loop variable: \"\*\" \* i. String repetition does the heavy lifting.*

## Solution:

> n = 5
>
> for i in range(1, n + 1):
>
> print(\"\*\" \* i)
>
> \# When i=1: \*, when i=2: \*\*, etc.


---

# Chapter 4: Functions

As your programs grow, you will notice that certain tasks are performed repeatedly: validating input, formatting output, calculating values, processing data. Functions let you wrap a reusable block of code behind a name, so you can call it whenever needed without duplicating the code. This follows the DRY principle (Don't Repeat Yourself) and is foundational to writing clean, maintainable software.

## Defining and Calling Functions

You define a function with the def keyword, followed by the function name, parentheses (with optional parameters), and a colon. The function body is indented below. To execute the function, you call it by name with parentheses.

> def greet(name):
>
> \"\"\"Greet a person by name.\"\"\"
>
> print(f\"Hello, {name}!\")
>
> greet(\"Alice\") \# Hello, Alice!
>
> greet(\"Bob\") \# Hello, Bob!

Let us break this down line by line. def greet(name): defines a function called greet that takes one parameter called name. The triple-quoted string on the next line is a docstring — a built-in documentation string that describes what the function does. You can access it later with help(greet) or greet.\_\_doc\_\_. The function body is the indented print statement. When we call greet(\"Alice\"), Python jumps into the function body, substitutes name with \"Alice\", prints the greeting, and then returns to where the function was called.

## Parameters and Arguments

Parameters are the variable names listed in the function's definition (the blueprint). Arguments are the actual values you pass when calling the function. While these terms are often used interchangeably in casual conversation, understanding the distinction helps when reading documentation.

## Positional Arguments

By default, arguments are matched to parameters by position — the first argument goes to the first parameter, the second to the second, and so on.

> def power(base, exponent):
>
> return base \*\* exponent
>
> print(power(2, 10)) \# 1024 (base=2, exponent=10)
>
> print(power(10, 2)) \# 100 (base=10, exponent=2)

Order matters with positional arguments: power(2, 10) calculates 2 raised to 10 (1024), while power(10, 2) calculates 10 raised to 2 (100). The return statement sends a value back to the caller. Here, the result of base \*\* exponent is returned and can be stored in a variable or passed directly to print().

## Keyword Arguments

You can also pass arguments by name, which makes the order irrelevant and the code more readable:

> \# Using keyword arguments, order doesn\'t matter
>
> print(power(exponent=10, base=2)) \# 1024

By explicitly naming each argument, the reader immediately understands which value is the base and which is the exponent, even if the order is reversed. This is especially useful for functions with many parameters.

## Default Parameter Values

You can give parameters default values, making them optional when calling the function. Parameters without defaults must come before parameters with defaults.

> def greet(name, greeting=\"Hello\"):
>
> print(f\"{greeting}, {name}!\")
>
> greet(\"Alice\") \# Hello, Alice!
>
> greet(\"Alice\", \"Good morning\") \# Good morning, Alice!

In this example, greeting has a default value of \"Hello\". If the caller provides only one argument, greeting uses its default. If the caller provides two arguments, the second replaces the default. This pattern lets you design functions that are simple to call in common cases but flexible for special cases.

Important warning about mutable default values: if you use a mutable object like a list or dictionary as a default parameter, that object is created once (when the function is defined) and shared across all calls. This leads to a notorious bug:

> \# WRONG: mutable default - the same list is reused!
>
> def add_item(item, items=\[\]):
>
> items.append(item)
>
> return items
>
> print(add_item(\"a\")) \# \[\'a\'\]
>
> print(add_item(\"b\")) \# \[\'a\', \'b\'\] \-- unexpected!
>
> \# CORRECT: use None and create a new list inside
>
> def add_item(item, items=None):
>
> if items is None:
>
> items = \[\]
>
> items.append(item)
>
> return items

In the wrong version, the default list \[\] is created once and modified on every call. By the second call, it already contains \'a\' from the first call. The correct version uses None as the default and creates a fresh list inside the function body each time.

**\*args and \*\*kwargs**

Sometimes you do not know in advance how many arguments a function will receive. Python provides two special syntaxes for this: \*args collects extra positional arguments into a tuple, and \*\*kwargs collects extra keyword arguments into a dictionary.

> def total(\*args):
>
> \"\"\"Sum any number of arguments.\"\"\"
>
> return sum(args)
>
> print(total(1, 2, 3)) \# 6
>
> print(total(10, 20, 30, 40)) \# 100
>
> def profile(\*\*kwargs):
>
> \"\"\"Print key-value pairs.\"\"\"
>
> for key, value in kwargs.items():
>
> print(f\"{key}: {value}\")
>
> profile(name=\"Alice\", age=30, city=\"NYC\")
>
> \# name: Alice
>
> \# age: 30
>
> \# city: NYC

The \*args parameter (the asterisk is what matters, not the name) captures all positional arguments into a tuple. Inside total(), args is the tuple (1, 2, 3) or (10, 20, 30, 40), and we use sum() to add them up. The \*\*kwargs parameter (double asterisk) captures keyword arguments into a dictionary. Inside profile(), kwargs is {\"name\": \"Alice\", \"age\": 30, \"city\": \"NYC\"}, and we iterate over its key-value pairs. You can use \*args and \*\*kwargs together in the same function: def func(a, b, \*args, \*\*kwargs).

## Return Values

Functions can send data back to the caller using the return statement. A function without an explicit return (or with just return and no value) returns None by default. You can return any data type, including multiple values using tuples.

> def calculate_area(length, width):
>
> return length \* width
>
> area = calculate_area(5, 3)
>
> print(area) \# 15
>
> \# Returning multiple values (Python returns them as a tuple)
>
> def min_max(numbers):
>
> return min(numbers), max(numbers)
>
> low, high = min_max(\[3, 1, 7, 2, 9\])
>
> print(low, high) \# 1 9

In the first function, return length \* width sends the computed area back to the caller, where it is stored in the variable area. In the second function, min_max returns two values separated by a comma, which Python automatically packs into a tuple. On the calling side, low, high = min_max(\...) unpacks that tuple into two separate variables. This is a very common Python pattern for functions that need to return multiple results.

## Scope and the LEGB Rule

Not all variables are accessible from everywhere in your code. Where a variable can be accessed is called its scope. Python uses the LEGB rule to resolve variable names, searching in this order: Local (inside the current function), Enclosing (inside any enclosing function), Global (at the module level), Built-in (Python's built-in names like print, len, etc.).

> x = \"global\" \# Global scope
>
> def outer():
>
> x = \"enclosing\" \# Enclosing scope
>
> def inner():
>
> x = \"local\" \# Local scope
>
> print(x) \# \"local\"
>
> inner()
>
> print(x) \# \"enclosing\"
>
> outer()
>
> print(x) \# \"global\"

There are three different variables named x here, each in a different scope. When inner() runs and encounters x, Python first looks locally (inside inner), finds x = \"local\", and uses it. When outer() prints x after calling inner(), Python looks locally (inside outer) and finds x = \"enclosing\". The global x = \"global\" is untouched by both functions. Each scope is independent. The global and nonlocal keywords let you modify variables in outer scopes, but this is generally discouraged because it makes code harder to reason about. Prefer returning values instead.

## Lambda Functions

Lambda functions are small, anonymous (unnamed) functions defined in a single line. The syntax is: lambda parameters: expression. They are most useful when you need a short function as an argument to another function, such as sort(), map(), or filter().

> \# Regular function
>
> def square(x):
>
> return x \*\* 2
>
> \# Equivalent lambda
>
> square = lambda x: x \*\* 2
>
> print(square(5)) \# 25
>
> \# Common use: custom sort key
>
> students = \[(\"Alice\", 85), (\"Bob\", 92), (\"Charlie\", 78)\]
>
> students.sort(key=lambda s: s\[1\], reverse=True)
>
> print(students) \# \[(\'Bob\', 92), (\'Alice\', 85), (\'Charlie\', 78)\]

The lambda version of square takes one parameter x and returns x \*\* 2. It does the same thing as the regular function but in a single expression. Lambdas cannot contain multiple statements or complex logic — they are limited to a single expression.

The most common real-world use of lambdas is as a key function for sorting. In the students example, each element is a tuple (name, score). The key=lambda s: s\[1\] tells sort() to use the second element (index 1, the score) as the sorting criterion. With reverse=True, the sort is descending (highest score first). You could achieve the same result with a regular function, but the lambda is more concise for such a simple transformation.

## Higher-Order Functions: map, filter, reduce

Higher-order functions are functions that take other functions as arguments or return functions. Python's built-in map(), filter(), and reduce() are powerful tools for processing collections.

> numbers = \[1, 2, 3, 4, 5\]
>
> \# map: apply a function to every element
>
> squared = list(map(lambda x: x\*\*2, numbers))
>
> print(squared) \# \[1, 4, 9, 16, 25\]
>
> \# filter: keep elements where function returns True
>
> evens = list(filter(lambda x: x % 2 == 0, numbers))
>
> print(evens) \# \[2, 4\]
>
> \# reduce: accumulate elements into a single value
>
> from functools import reduce
>
> product = reduce(lambda a, b: a \* b, numbers)
>
> print(product) \# 120 (1\*2\*3\*4\*5)

map() takes a function and an iterable, applies the function to every element, and returns a new iterable of results. We wrap it in list() to see the results as a list. filter() keeps only elements for which the function returns True — here, only even numbers pass the test. reduce() is different: it takes the first two elements, applies the function to get a result, then applies the function to that result and the next element, and so on until one value remains. So 1\*2=2, 2\*3=6, 6\*4=24, 24\*5=120.

In modern Python, list comprehensions are often preferred over map() and filter() for readability: \[x\*\*2 for x in numbers\] is clearer than list(map(lambda x: x\*\*2, numbers)). But understanding these higher-order functions is important because they appear in many codebases and are conceptual foundations for functional programming.

## Recursion

A recursive function is a function that calls itself. This is useful for problems that can be broken down into smaller, identical sub-problems. Every recursive function must have a base case (a condition where it stops calling itself) to avoid infinite recursion.

> def factorial(n):
>
> \"\"\"Calculate n! recursively.\"\"\"
>
> if n \<= 1: \# Base case: stop here
>
> return 1
>
> return n \* factorial(n - 1) \# Recursive case
>
> print(factorial(5)) \# 120
>
> \# Trace: factorial(5) = 5 \* factorial(4)
>
> \# factorial(4) = 4 \* factorial(3)
>
> \# factorial(3) = 3 \* factorial(2)
>
> \# factorial(2) = 2 \* factorial(1)
>
> \# factorial(1) = 1 (base case!)
>
> \# = 5 \* 4 \* 3 \* 2 \* 1 = 120

The base case is n \<= 1: if n is 0 or 1, the factorial is 1, and we return immediately. For any other n, the function calls itself with n-1 and multiplies the result by n. The trace in the comments shows how the calls stack up and then unwind. Python has a default recursion limit of 1000 calls (to prevent infinite recursion from crashing your system), which you can check with sys.getrecursionlimit(). For very deep recursion, consider using an iterative approach instead.

## Practice Exercises

**Exercise 1:** Write a function is_palindrome(text) that returns True if the given string reads the same forwards and backwards (ignore case). Test it with \"Racecar\" and \"Python\".

**Hint:** *Convert to lowercase with .lower() to make the comparison case-insensitive, then compare the string to its reverse using slicing: text\[::-1\] reverses a string.*

## Solution:

> def is_palindrome(text):
>
> text = text.lower()
>
> return text == text\[::-1\]
>
> print(is_palindrome(\"Racecar\")) \# True
>
> print(is_palindrome(\"Python\")) \# False

**Exercise 2:** Write a function that accepts any number of integers using \*args and returns a dictionary with keys: \"sum\", \"average\", \"min\", \"max\".

**Hint:** *The args parameter will be a tuple of all passed integers. Use sum(args), len(args), min(args), max(args) to compute the values. Return a dictionary literal with the four keys.*

## Solution:

> def stats(\*args):
>
> return {
>
> \"sum\": sum(args),
>
> \"average\": sum(args) / len(args),
>
> \"min\": min(args),
>
> \"max\": max(args),
>
> }
>
> print(stats(10, 20, 30, 40, 50))
>
> \# {\'sum\': 150, \'average\': 30.0, \'min\': 10, \'max\': 50}

**Exercise 3:** Write a recursive function fibonacci(n) that returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1, fib(2)=1, \...).

**Hint:** *Base cases: return 0 if n==0, return 1 if n==1. Recursive case: return fibonacci(n-1) + fibonacci(n-2). Note: this naive approach is slow for large n due to repeated calculations.*

## Solution:

> def fibonacci(n):
>
> if n == 0:
>
> return 0
>
> if n == 1:
>
> return 1
>
> return fibonacci(n - 1) + fibonacci(n - 2)
>
> for i in range(10):
>
> print(fibonacci(i), end=\" \") \# 0 1 1 2 3 5 8 13 21 34


---

# Chapter 5: Strings In Depth

Strings are one of the most frequently used data types in any programming language. Whether you are processing user input, reading files, generating reports, or communicating with APIs, you will work with strings constantly. Python provides an exceptionally rich set of built-in string methods, making it one of the best languages for text processing.

## String Basics Recap

Strings are immutable sequences of Unicode characters. "Immutable" means that every operation that appears to modify a string actually creates a brand new string in memory. "Sequence" means that strings support indexing (accessing individual characters), slicing (extracting substrings), and iteration (looping through characters).

> s = \"Hello, World!\"
>
> print(len(s)) \# 13 (length: counts all characters including space and !)
>
> print(s\[0\]) \# \'H\' (first character, index starts at 0)
>
> print(s\[-1\]) \# \'!\' (last character, negative indexing from end)
>
> print(s\[7:12\]) \# \'World\' (slice from index 7 up to but NOT including 12)
>
> print(s\[:5\]) \# \'Hello\' (from start up to index 5)
>
> print(s\[7:\]) \# \'World!\' (from index 7 to end)
>
> print(s\[::2\]) \# \'Hlo ol!\' (every 2nd character)
>
> print(s\[::-1\]) \# \'!dlroW ,olleH\' (reversed: step -1 walks backwards)

Indexing starts at 0 in Python, so s\[0\] is the first character and s\[12\] would be the last in a 13-character string. Negative indexing counts from the end: s\[-1\] is the last character, s\[-2\] is the second-to-last, and so on. Slicing uses the format s\[start:stop:step\], where start is inclusive and stop is exclusive. The step controls direction and stride: s\[::-1\] reverses the string because a step of -1 walks backwards through every character.

## Essential String Methods

Python strings come with dozens of built-in methods. Here are the most important ones, organized by category.

## Case Methods

These methods return new strings with modified casing. Remember, they do not change the original string (strings are immutable).

> text = \"hello, WORLD\"
>
> print(text.upper()) \# HELLO, WORLD (all uppercase)
>
> print(text.lower()) \# hello, world (all lowercase)
>
> print(text.capitalize()) \# Hello, world (first char upper, rest lower)
>
> print(text.title()) \# Hello, World (first char of each word upper)
>
> print(text.swapcase()) \# HELLO, world (flip every character\'s case)

These are commonly used for case-insensitive comparisons (convert both strings to lower before comparing), formatting display names, and normalizing user input.

## Search and Check Methods

These methods help you find substrings within a string and check whether a string matches certain patterns.

> text = \"Python is awesome and Python is powerful\"
>
> print(text.find(\"Python\")) \# 0 (index of first occurrence)
>
> print(text.rfind(\"Python\")) \# 23 (index of last occurrence)
>
> print(text.count(\"Python\")) \# 2 (total occurrences)
>
> print(text.startswith(\"Python\")) \# True
>
> print(text.endswith(\"ful\")) \# True
>
> print(\"awesome\" in text) \# True (membership test with \'in\')

find() returns the index of the first occurrence of a substring, or -1 if not found (unlike index(), which raises an error if not found). rfind() searches from the right. count() tells you how many times a substring appears. startswith() and endswith() are extremely useful for checking file extensions, URL prefixes, and more. The in operator is the simplest way to check whether a substring exists anywhere in the string.

## Modification Methods

These methods create new strings with modifications applied.

> text = \" Hello, World! \"
>
> print(text.strip()) \# \'Hello, World!\' (remove whitespace from both ends)
>
> print(text.lstrip()) \# \'Hello, World! \' (left strip only)
>
> print(text.rstrip()) \# \' Hello, World!\' (right strip only)
>
> print(\"hello\".replace(\"l\", \"r\")) \# \"herro\" (replace all occurrences)
>
> print(\"hello\".replace(\"l\", \"r\", 1)) \# \"herlo\" (replace only first occurrence)
>
> print(\"a,b,c,d\".split(\",\")) \# \[\"a\", \"b\", \"c\", \"d\"\] (split into list)
>
> print(\" \".join(\[\"Hello\", \"World\"\])) \# \"Hello World\" (join list into string)
>
> print(\"-\".join(\[\"2026\", \"03\", \"27\"\])) \# \"2026-03-27\" (join with custom separator)

strip() is essential for cleaning user input (which often has trailing whitespace or newlines). replace() creates a new string with all occurrences of a substring replaced; the optional third argument limits how many replacements are made. split() and join() are inverse operations: split() breaks a string into a list of substrings at every occurrence of a delimiter, while join() takes a list of strings and connects them using the string as a separator. The split()/join() pair is one of the most commonly used patterns in Python text processing.

## Validation Methods

These methods return True or False based on the content of the string, which is useful for input validation.

> print(\"12345\".isdigit()) \# True (all characters are digits)
>
> print(\"hello\".isalpha()) \# True (all characters are letters)
>
> print(\"hello123\".isalnum()) \# True (all characters are letters or digits)
>
> print(\" \".isspace()) \# True (all characters are whitespace)
>
> print(\"Hello World\".istitle()) \# True (title case: each word capitalized)

These methods check every character in the string. isdigit() is particularly useful for validating numeric input before converting with int(). isalpha() can verify that a name contains only letters. isalnum() combines both checks. All of these return False for empty strings.

## String Formatting Deep Dive

We covered f-strings in Chapter 2, but let us explore more advanced formatting options and the older .format() method.

> \# f-strings with expressions
>
> name = \"Alice\"
>
> items = \[1, 2, 3\]
>
> print(f\"Length: {len(items)}\") \# Any expression works inside {}
>
> print(f\"Upper: {name.upper()}\") \# Method calls work too
>
> \# Number formatting
>
> n = 1234567.891
>
> print(f\"{n:,.2f}\") \# 1,234,567.89 (commas as thousands separator, 2 decimals)
>
> print(f\"{42:05d}\") \# 00042 (zero-padded to 5 digits)
>
> print(f\"{0.75:.1%}\") \# 75.0% (format as percentage with 1 decimal)
>
> \# .format() method (older style, still widely used)
>
> print(\"Hello, {}!\".format(\"World\"))
>
> print(\"{name} is {age}\".format(name=\"Alice\", age=30))

The format specification after the colon inside {} is incredibly powerful: , inserts comma separators, .2f means 2 decimal places as float, 05d means zero-pad to 5 digits as integer, .1% multiplies by 100 and formats as a percentage. The .format() method is the older approach (pre-Python 3.6) and is still valid, but f-strings are preferred in new code because they are more readable and faster.

## Raw Strings and Escape Characters

Backslash (\\) is the escape character in Python strings. It gives special meaning to the next character: \\n becomes a newline, \\t becomes a tab, and so on. But sometimes you want literal backslashes (e.g., Windows file paths or regular expressions). Raw strings, prefixed with r, disable escape character processing.

> \# Common escape characters
>
> print(\"Line 1\\nLine 2\") \# \\n = Newline (output on two lines)
>
> print(\"Column1\\tColumn2\") \# \\t = Tab (horizontal spacing)
>
> print(\"She said \\\"hi\\\"\") \# \\\" = Literal double quote
>
> print(\"Path: C:\\\\Users\") \# \\\\ = Literal backslash
>
> \# Raw strings: backslashes are treated literally
>
> print(r\"C:\\Users\\new_folder\") \# C:\\Users\\new_folder (no escape processing)
>
> print(r\"\\n is not a newline\") \# \\n is not a newline

In a normal string, \"C:\\Users\\new_folder\" would interpret \\n as a newline. In a raw string (prefixed with r), the backslash is treated as a literal character. Raw strings are essential for writing Windows file paths and regular expressions, where backslashes appear frequently.

## Practice Exercises

**Exercise 1:** Write a function count_vowels(text) that returns the number of vowels (a, e, i, o, u) in a string, ignoring case.

**Hint:** *Convert the text to lowercase first with .lower(), then loop through each character and check if it belongs to the string \"aeiou\". Use a generator expression with sum() for a concise solution.*

## Solution:

> def count_vowels(text):
>
> vowels = \"aeiou\"
>
> return sum(1 for char in text.lower() if char in vowels)
>
> print(count_vowels(\"Hello World\")) \# 3 (e, o, o)
>
> print(count_vowels(\"AEIOU\")) \# 5
>
> print(count_vowels(\"rhythm\")) \# 0

**Exercise 2:** Write a function that takes a sentence and returns it with each word reversed but the word order preserved. Example: \"Hello World\" becomes \"olleH dlroW\".

**Hint:** *Split the sentence into words with .split(), reverse each word with \[::-1\] slicing, then join them back with \" \".join(). A generator expression inside join() makes it one line.*

## Solution:

> def reverse_words(sentence):
>
> return \" \".join(word\[::-1\] for word in sentence.split())
>
> print(reverse_words(\"Hello World\")) \# \"olleH dlroW\"
>
> print(reverse_words(\"Python is great\")) \# \"nohtyP si taerg\"

**Exercise 3:** Write a function that takes a string and returns a dictionary with the count of each character (excluding spaces).

**Hint:** *Loop through each character, skip spaces with an if check, and use dict.get(key, default) to increment counts. The .get() method returns the default value (0) if the key does not exist yet.*

## Solution:

> def char_count(text):
>
> counts = {}
>
> for char in text:
>
> if char != \" \":
>
> counts\[char\] = counts.get(char, 0) + 1
>
> return counts
>
> print(char_count(\"hello\"))
>
> \# {\'h\': 1, \'e\': 1, \'l\': 2, \'o\': 1}


---

# Chapter 6: Data Structures

Data structures are the building blocks of every program. They determine how data is organized in memory and what operations you can perform efficiently. Choosing the right data structure is one of the most important decisions a programmer makes — it affects both the correctness and performance of your code.

Python has four built-in data structure types: lists, tuples, sets, and dictionaries. Each has different strengths, and understanding when to use which is a skill that separates beginners from competent programmers.

## Lists

Lists are ordered, mutable (changeable) collections that can hold items of any type, including other lists. They are the most versatile and commonly used data structure in Python. You can think of a list as a numbered sequence of boxes, where each box holds a value.

> \# Creating lists
>
> fruits = \[\"apple\", \"banana\", \"cherry\"\]
>
> numbers = \[1, 2, 3, 4, 5\]
>
> mixed = \[1, \"hello\", 3.14, True, None\] \# Different types allowed
>
> empty = \[\] \# Empty list

Lists are defined with square brackets \[\]. Elements are separated by commas. Unlike arrays in some languages, Python lists can hold items of different types in the same list (though this is uncommon in practice). The empty list \[\] is often used as a starting point that you build up over time.

## Accessing and Slicing

Lists support the same indexing and slicing syntax as strings, because both are sequences.

> fruits = \[\"apple\", \"banana\", \"cherry\", \"date\", \"elderberry\"\]
>
> print(fruits\[0\]) \# apple (first element)
>
> print(fruits\[-1\]) \# elderberry (last element)
>
> print(fruits\[1:3\]) \# \[\'banana\', \'cherry\'\] (index 1 up to, not including, 3)
>
> print(fruits\[:2\]) \# \[\'apple\', \'banana\'\] (first 2 elements)
>
> print(fruits\[::2\]) \# \[\'apple\', \'cherry\', \'elderberry\'\] (every 2nd element)

Remember: indexing starts at 0, and slicing uses \[start:stop:step\] where stop is exclusive. Negative indices count from the end. Slicing always returns a new list, leaving the original unchanged.

## Modifying Lists

Since lists are mutable, you can add, remove, and rearrange elements in place. Here are the most important list operations:

> fruits = \[\"apple\", \"banana\", \"cherry\"\]
>
> \# Adding elements
>
> fruits.append(\"date\") \# Add to end: \[\..., \"date\"\]
>
> fruits.insert(1, \"avocado\") \# Insert at index 1, shifting others right
>
> fruits.extend(\[\"fig\", \"grape\"\]) \# Add multiple items from another iterable
>
> \# Removing elements
>
> fruits.remove(\"banana\") \# Remove first occurrence by value
>
> popped = fruits.pop() \# Remove and return the last item
>
> popped_idx = fruits.pop(0) \# Remove and return item at a specific index
>
> del fruits\[0\] \# Delete by index (no return value)
>
> \# Sorting and reversing
>
> numbers = \[3, 1, 4, 1, 5, 9, 2, 6\]
>
> numbers.sort() \# Sort in-place (modifies the list)
>
> numbers.sort(reverse=True) \# Sort descending in-place
>
> sorted_copy = sorted(numbers) \# Returns a NEW sorted list (original unchanged)
>
> numbers.reverse() \# Reverse in-place

The distinction between .sort() and sorted() is important. .sort() modifies the list directly and returns None. sorted() creates and returns a new sorted list, leaving the original untouched. Use .sort() when you no longer need the original order; use sorted() when you need both the original and sorted versions. The .remove() method raises a ValueError if the element is not found, so check membership with in before removing if you are unsure.

## List Comprehensions

List comprehensions are one of Python's most powerful features. They provide a concise, readable way to create lists by transforming and/or filtering elements from an existing iterable. They are generally faster than equivalent for loops because Python optimizes them internally.

> \# Basic: \[expression for item in iterable\]
>
> squares = \[x\*\*2 for x in range(10)\]
>
> \# Creates: \[0, 1, 4, 9, 16, 25, 36, 49, 64, 81\]
>
> \# With condition: \[expression for item in iterable if condition\]
>
> even_squares = \[x\*\*2 for x in range(10) if x % 2 == 0\]
>
> \# Only squares of even numbers: \[0, 4, 16, 36, 64\]
>
> \# Nested: flatten a 2D list (list of lists) into 1D
>
> matrix = \[\[1, 2, 3\], \[4, 5, 6\], \[7, 8, 9\]\]
>
> flat = \[num for row in matrix for num in row\]
>
> \# \[1, 2, 3, 4, 5, 6, 7, 8, 9\]
>
> \# With if-else (note: the if-else goes BEFORE the for)
>
> labels = \[\"even\" if x % 2 == 0 else \"odd\" for x in range(5)\]
>
> \# \[\'even\', \'odd\', \'even\', \'odd\', \'even\'\]

Read comprehensions left to right: "give me x squared, for each x in range(10), but only if x is even." The nested comprehension reads: "give me num, for each row in matrix, for each num in that row" — the outer loop comes first. The if-else form is a conditional expression (ternary) and goes before the for clause, while a filter condition goes after.

## Useful List Patterns

These built-in functions and patterns are used constantly with lists in professional Python code.

> \# enumerate: get both index and value in a loop
>
> fruits = \[\"apple\", \"banana\", \"cherry\"\]
>
> for i, fruit in enumerate(fruits):
>
> print(f\"{i}: {fruit}\") \# 0: apple, 1: banana, 2: cherry
>
> \# zip: iterate over multiple lists in parallel
>
> names = \[\"Alice\", \"Bob\", \"Charlie\"\]
>
> scores = \[85, 92, 78\]
>
> for name, score in zip(names, scores):
>
> print(f\"{name}: {score}\") \# Alice: 85, Bob: 92, Charlie: 78
>
> \# Unpacking with \* (star expression)
>
> first, \*middle, last = \[1, 2, 3, 4, 5\]
>
> \# first=1, middle=\[2, 3, 4\], last=5

enumerate() is the Pythonic way to get both the index and value when iterating — avoid manually incrementing a counter variable. zip() pairs up elements from multiple iterables; it stops at the shortest one. The star expression (\*middle) in unpacking captures all the "leftover" elements into a list — very handy for splitting a list into head, body, and tail.

## Tuples

Tuples are ordered, immutable collections. Once a tuple is created, you cannot add, remove, or change its elements. This immutability makes tuples safer for data that should not change (like coordinates, configuration values, or database rows) and allows them to be used as dictionary keys or set elements (which lists cannot be, because they are mutable).

> \# Creating tuples
>
> point = (3, 4)
>
> colors = (\"red\", \"green\", \"blue\")
>
> single = (42,) \# IMPORTANT: comma makes it a tuple, not just parentheses
>
> empty = ()
>
> from_list = tuple(\[1, 2, 3\]) \# Convert a list to a tuple
>
> \# Accessing (same syntax as lists)
>
> print(point\[0\]) \# 3
>
> print(colors\[-1\]) \# blue
>
> print(colors\[1:\]) \# (\'green\', \'blue\')
>
> \# Tuple unpacking (extremely common in Python)
>
> x, y = point \# x=3, y=4
>
> name, age, city = (\"Alice\", 30, \"NYC\")
>
> \# Named tuples: tuples with named fields (more readable)
>
> from collections import namedtuple
>
> Point = namedtuple(\"Point\", \[\"x\", \"y\"\])
>
> p = Point(3, 4)
>
> print(p.x, p.y) \# 3 4 (access by name instead of index)

The trickiest thing about tuples is the single-element case: (42) is just the integer 42 in parentheses, while (42,) is a tuple containing 42. The comma is what creates the tuple, not the parentheses. Tuple unpacking is one of Python's most elegant features — it lets you assign multiple variables in one line and is used extensively in for loops with enumerate() and zip(). Named tuples from the collections module give you the immutability of tuples with the readability of named attributes.

## When to Use Lists vs Tuples

-   Use lists when you need a mutable collection that may grow, shrink, or change during the program.

-   Use tuples for fixed collections that should not change: coordinates (x, y), RGB colors (r, g, b), function return values, database rows.

-   Use tuples as dictionary keys or set elements — lists cannot be used for this because they are not hashable.

-   Tuples use slightly less memory and are slightly faster to create than lists, making them better for large immutable datasets.

## Sets

Sets are unordered collections of unique elements. They automatically eliminate duplicates and are optimized for two things: membership testing (checking if an element exists) and mathematical set operations (union, intersection, difference). Membership testing with in is O(1) average time for sets, compared to O(n) for lists.

> \# Creating sets
>
> fruits = {\"apple\", \"banana\", \"cherry\"}
>
> numbers = set(\[1, 2, 2, 3, 3, 3\]) \# {1, 2, 3} (duplicates auto-removed)
>
> empty = set() \# NOT {} (that creates an empty dict!)
>
> \# Add and remove
>
> fruits.add(\"date\") \# Add a single element
>
> fruits.discard(\"banana\") \# Remove if present (no error if missing)
>
> fruits.remove(\"cherry\") \# Remove (raises KeyError if missing)
>
> \# Membership test: O(1) average time!
>
> print(\"apple\" in fruits) \# True (much faster than checking a list)
>
> \# Set operations (mathematical set theory)
>
> a = {1, 2, 3, 4}
>
> b = {3, 4, 5, 6}
>
> print(a \| b) \# Union: {1, 2, 3, 4, 5, 6} (all elements from both)
>
> print(a & b) \# Intersection: {3, 4} (elements in both)
>
> print(a - b) \# Difference: {1, 2} (in a but not in b)
>
> print(a \^ b) \# Symmetric diff: {1, 2, 5, 6} (in one but not both)
>
> \# Set comprehension
>
> squares = {x\*\*2 for x in range(-3, 4)}
>
> \# {0, 1, 4, 9} (duplicates removed: (-3)\^2 = 3\^2 = 9)

The most common pitfall with sets is creating an empty set: {} creates an empty dictionary, not an empty set. Use set() for an empty set. The set operations are incredibly useful: union (\|) combines sets, intersection (&) finds common elements, difference (-) finds elements in one set but not the other, and symmetric difference (\^) finds elements in either set but not both. Use discard() over remove() when you are not sure if the element exists, since discard() silently does nothing if the element is missing.

## Dictionaries

Dictionaries (dicts) are collections of key-value pairs. Each key maps to a value, like a real-world dictionary maps words to definitions. Keys must be hashable (immutable types like strings, numbers, tuples), while values can be anything. Since Python 3.7, dictionaries maintain insertion order. Lookups by key are O(1) average time.

> \# Creating dictionaries
>
> student = {\"name\": \"Alice\", \"age\": 22, \"major\": \"CS\"}
>
> squares = {x: x\*\*2 for x in range(6)} \# Dict comprehension
>
> from_pairs = dict(\[(\"a\", 1), (\"b\", 2)\]) \# From list of tuples
>
> \# Accessing values
>
> print(student\[\"name\"\]) \# Alice (raises KeyError if key missing)
>
> print(student.get(\"gpa\", 0.0)) \# 0.0 (returns default if key missing)
>
> \# Modifying
>
> student\[\"gpa\"\] = 3.8 \# Add a new key-value pair
>
> student\[\"age\"\] = 23 \# Update an existing value
>
> del student\[\"major\"\] \# Delete a key-value pair
>
> removed = student.pop(\"gpa\") \# Remove key and return its value

The most important distinction here is between student\[\"name\"\] and student.get(\"name\"). Square bracket access raises a KeyError if the key does not exist, which will crash your program. The .get() method returns None (or a custom default value) if the key is missing, making it safer for lookups where the key might not exist. Always use .get() when you are not certain the key is present, and square brackets when you know it must be there (and want to fail loudly if it is not).

## Iterating Over Dictionaries

Dictionaries offer three views for iteration: keys (default), values, and key-value pairs.

> person = {\"name\": \"Alice\", \"age\": 30, \"city\": \"NYC\"}
>
> \# Iterating over keys (default behavior)
>
> for key in person:
>
> print(key) \# name, age, city
>
> \# Iterating over values only
>
> for value in person.values():
>
> print(value) \# Alice, 30, NYC
>
> \# Iterating over key-value pairs (most common)
>
> for key, value in person.items():
>
> print(f\"{key}: {value}\") \# name: Alice, age: 30, city: NYC

The .items() method is by far the most commonly used, because you almost always need both the key and the value. It returns pairs of (key, value) tuples, which you can unpack directly in the for loop. Using for key in person iterates over keys only — equivalent to for key in person.keys().

## Useful Dictionary Patterns

These patterns appear in virtually every Python codebase. Mastering them will make you significantly more productive.

> \# Pattern 1: Counting occurrences with .get()
>
> text = \"hello world\"
>
> freq = {}
>
> for char in text:
>
> freq\[char\] = freq.get(char, 0) + 1
>
> \# freq.get(char, 0) returns 0 if char not yet in dict
>
> \# Pattern 2: Counter from collections (does the same thing elegantly)
>
> from collections import Counter
>
> freq = Counter(text)
>
> print(freq.most_common(3)) \# \[(\"l\", 3), (\"o\", 2), (\"h\", 1)\]
>
> \# Pattern 3: defaultdict (auto-creates missing keys with a factory)
>
> from collections import defaultdict
>
> groups = defaultdict(list) \# Missing keys auto-create empty lists
>
> groups\[\"fruits\"\].append(\"apple\") \# No KeyError!
>
> groups\[\"vegs\"\].append(\"carrot\")
>
> \# Pattern 4: Merging dicts (Python 3.9+)
>
> a = {\"x\": 1, \"y\": 2}
>
> b = {\"y\": 3, \"z\": 4}
>
> merged = a \| b \# {\'x\': 1, \'y\': 3, \'z\': 4} (b\'s values win on conflicts)

The counting pattern with .get(char, 0) is fundamental: it reads as "get the current count for this character (defaulting to 0 if it is a new character) and add 1." Counter from collections automates this entirely and adds useful methods like .most_common(). defaultdict goes a step further: you specify a factory function (like list), and whenever you access a missing key, it automatically creates the default value. This eliminates the need for "check if key exists, if not create it" boilerplate. The merge operator \| (Python 3.9+) combines two dictionaries; when both have the same key, the right-hand dictionary's value wins.

## Choosing the Right Data Structure

Here is a quick decision guide for choosing between Python's four built-in data structures:

-   Need an ordered, changeable sequence? Use a list. Example: a shopping cart, a to-do list, a sequence of events.

-   Need an ordered, unchangeable sequence? Use a tuple. Example: coordinates (x, y), RGB colors, database row, function return of multiple values.

-   Need to store unique items or do fast membership tests? Use a set. Example: seen URLs in a web crawler, unique tags, finding duplicates.

-   Need to map keys to values for fast lookups? Use a dictionary. Example: student records, configuration settings, word frequency counts.

## Practice Exercises

**Exercise 1:** Write a function that takes two lists and returns a list of elements common to both, without duplicates. First write it with loops, then refactor using sets.

**Hint:** *Loop approach: iterate through one list, check if each item is in the other list AND not already in your result list. Set approach: convert both lists to sets and use the & (intersection) operator.*

## Solution:

> \# Approach 1: Manual loop
>
> def common_elements_v1(list1, list2):
>
> result = \[\]
>
> for item in list1:
>
> if item in list2 and item not in result:
>
> result.append(item)
>
> return result
>
> \# Approach 2: Sets (cleaner and faster for large lists)
>
> def common_elements_v2(list1, list2):
>
> return list(set(list1) & set(list2))
>
> a = \[1, 2, 3, 4, 5, 5\]
>
> b = \[4, 5, 6, 7, 8, 5\]
>
> print(common_elements_v1(a, b)) \# \[4, 5\]
>
> print(common_elements_v2(a, b)) \# \[4, 5\]

**Exercise 2:** Write a function word_frequency(text) that returns a dictionary mapping each word (lowercase) to its count. Test with: \"the cat sat on the mat the cat\".

**Hint:** *Split the text into words with .split(), convert each to lowercase with .lower(), and count using dict.get(word, 0) + 1 pattern or collections.Counter.*

## Solution:

> def word_frequency(text):
>
> freq = {}
>
> for word in text.lower().split():
>
> freq\[word\] = freq.get(word, 0) + 1
>
> return freq
>
> result = word_frequency(\"the cat sat on the mat the cat\")
>
> print(result)
>
> \# {\'the\': 3, \'cat\': 2, \'sat\': 1, \'on\': 1, \'mat\': 1}

**Exercise 3:** Write a function that takes a list of (name, score) tuples and returns a dictionary grouping names by grade: A (\>=90), B (\>=80), C (\>=70), F (\<70).

**Hint:** *Create a dict with grade keys mapped to empty lists. Loop through tuples, determine grade with if-elif-else, append name to the correct list.*

## Solution:

> def group_by_grade(students):
>
> grades = {\"A\": \[\], \"B\": \[\], \"C\": \[\], \"F\": \[\]}
>
> for name, score in students:
>
> if score \>= 90:
>
> grades\[\"A\"\].append(name)
>
> elif score \>= 80:
>
> grades\[\"B\"\].append(name)
>
> elif score \>= 70:
>
> grades\[\"C\"\].append(name)
>
> else:
>
> grades\[\"F\"\].append(name)
>
> return grades
>
> students = \[
>
> (\"Alice\", 95), (\"Bob\", 82), (\"Charlie\", 67),
>
> (\"Diana\", 91), (\"Eve\", 73), (\"Frank\", 88)
>
> \]
>
> print(group_by_grade(students))

**Exercise 4:** Given a list with duplicates, write a one-liner that returns unique elements preserving original order. Do not use set() directly since sets are unordered.

**Hint:** *Use a list comprehension with a running set called seen. The trick: seen.add(x) returns None (falsy), so \'not seen.add(x)\' is always True but has the side effect of adding x to the set.*

## Solution:

> def unique_ordered(items):
>
> seen = set()
>
> return \[x for x in items if x not in seen and not seen.add(x)\]
>
> nums = \[3, 1, 4, 1, 5, 9, 2, 6, 5, 3\]
>
> print(unique_ordered(nums)) \# \[3, 1, 4, 5, 9, 2, 6\]


---

# Chapter 7: File Handling

Almost every real-world application needs to work with files: reading configuration, processing data, writing logs, generating reports. Python makes file handling straightforward with its built-in open() function and a philosophy of "resource management done right" through context managers.

## Opening and Closing Files

The open() function takes a filename and a mode string, and returns a file object. You use this object to read from or write to the file. The critical rule: always close files when you are done. The best way to ensure this is the with statement (a context manager), which automatically closes the file even if an error occurs.

> \# Manual open/close (NOT recommended - what if an error occurs?)
>
> f = open(\"data.txt\", \"r\")
>
> content = f.read()
>
> f.close() \# Easy to forget, and skipped if an error occurs above
>
> \# with statement (RECOMMENDED: guaranteed auto-close)
>
> with open(\"data.txt\", \"r\") as f:
>
> content = f.read()
>
> \# File is automatically closed here, even if read() raised an error

The with statement is Python's context manager pattern. When the indented block exits — whether normally or due to an exception — the file is closed automatically. This prevents resource leaks (leaving files open) and is the standard way to work with files in Python. Always use with unless you have a specific reason not to.

## File Modes

The second argument to open() specifies what you want to do with the file:

-   \"r\" — Read (default). The file must already exist; raises FileNotFoundError if it does not.

-   \"w\" — Write. Creates the file if it does not exist. If it does exist, all existing content is erased before writing.

-   \"a\" — Append. Creates the file if it does not exist. New data is added to the end without erasing existing content.

-   \"x\" — Exclusive creation. Creates a new file and fails with FileExistsError if the file already exists. Useful for avoiding accidental overwrites.

-   \"b\" — Binary mode. Add to other modes (e.g., \"rb\", \"wb\") for non-text files like images, PDFs, or executables.

-   \"r+\" — Read and write. The file must exist. The file pointer starts at the beginning.

## Reading Files

Python gives you three ways to read a file, each suited to different situations:

> \# Method 1: Read the entire file as one string
>
> \# Best for: small files where you need all content at once
>
> with open(\"data.txt\", \"r\") as f:
>
> content = f.read() \# One big string with all content
>
> \# Method 2: Read all lines into a list
>
> \# Best for: when you need random access to specific line numbers
>
> with open(\"data.txt\", \"r\") as f:
>
> lines = f.readlines() \# Each line is a string, including the \'\\n\'
>
> \# Method 3: Iterate line by line (BEST for large files)
>
> \# Best for: processing files that might not fit in memory
>
> with open(\"data.txt\", \"r\") as f:
>
> for line in f:
>
> print(line.strip()) \# strip() removes the trailing newline

Method 1 loads everything into one string — simple but uses memory proportional to the file size. Method 2 gives you a list of lines, so you can access lines\[5\] directly, but also loads everything into memory. Method 3 is the most memory-efficient: Python reads one line at a time, so even a 10 GB file can be processed without issue. Always use Method 3 for large files. Note that readlines() keeps the \\n at the end of each line, so use .strip() to remove it.

## Writing Files

Writing follows the same open-with-mode pattern. The key difference between modes is whether existing content is preserved:

> \# Write mode (\"w\"): creates or OVERWRITES the file
>
> with open(\"output.txt\", \"w\") as f:
>
> f.write(\"Hello, World!\\n\")
>
> f.write(\"Second line\\n\")
>
> \# Write multiple lines at once
>
> lines = \[\"Line 1\\n\", \"Line 2\\n\", \"Line 3\\n\"\]
>
> with open(\"output.txt\", \"w\") as f:
>
> f.writelines(lines) \# Does NOT add \\n automatically!
>
> \# Append mode (\"a\"): adds to the end without erasing
>
> with open(\"log.txt\", \"a\") as f:
>
> f.write(\"New log entry\\n\") \# Existing content is preserved

Important: write() does not automatically add a newline character. If you want separate lines, you must include \\n yourself. writelines() takes an iterable of strings and writes them all, but again, no newlines are added automatically — your strings must already include them. The distinction between \"w\" and \"a\" is critical: \"w\" erases existing content (use this to create or recreate a file), while \"a\" preserves it (use this for log files or accumulating data).

## Working with CSV Files

CSV (Comma-Separated Values) is one of the most common data exchange formats — spreadsheets, databases, and data science tools all speak CSV. Python's csv module handles the parsing quirks (like commas inside quoted fields) that make manual splitting unreliable.

> import csv
>
> \# Writing a CSV file
>
> with open(\"students.csv\", \"w\", newline=\"\") as f:
>
> writer = csv.writer(f)
>
> writer.writerow(\[\"Name\", \"Age\", \"Grade\"\]) \# Header row
>
> writer.writerow(\[\"Alice\", 22, \"A\"\])
>
> writer.writerow(\[\"Bob\", 23, \"B\"\])
>
> \# Reading a CSV file row by row
>
> with open(\"students.csv\", \"r\") as f:
>
> reader = csv.reader(f)
>
> header = next(reader) \# Read and skip the header row
>
> for row in reader:
>
> print(f\"{row\[0\]} is {row\[1\]} years old\") \# row is a list of strings
>
> \# DictReader: access columns by name instead of index
>
> with open(\"students.csv\", \"r\") as f:
>
> reader = csv.DictReader(f)
>
> for row in reader: \# Each row is a dictionary!
>
> print(row\[\"Name\"\], row\[\"Grade\"\])

The newline=\"\" argument when writing CSVs prevents double-spacing on Windows. csv.reader returns each row as a list of strings (even numbers are strings — cast them yourself). csv.DictReader is more readable: it uses the first row as column headers and returns each subsequent row as a dictionary, so you write row\[\"Name\"\] instead of row\[0\]. This makes your code self-documenting and resilient to column reordering.

## Working with JSON Files

JSON (JavaScript Object Notation) is the standard format for web APIs, configuration files, and data interchange between systems. Python's json module converts between Python dictionaries/lists and JSON strings seamlessly.

> import json
>
> \# Python dict to JSON string
>
> data = {\"name\": \"Alice\", \"age\": 30, \"scores\": \[95, 87, 92\]}
>
> json_str = json.dumps(data, indent=2) \# dumps = dump to string
>
> print(json_str) \# Pretty-printed JSON
>
> \# Write dict directly to a JSON file
>
> with open(\"data.json\", \"w\") as f:
>
> json.dump(data, f, indent=2) \# dump = dump to file
>
> \# Read JSON file back into a Python dict
>
> with open(\"data.json\", \"r\") as f:
>
> loaded = json.load(f) \# load = load from file
>
> print(loaded\[\"name\"\]) \# Alice
>
> print(type(loaded)) \# \<class \'dict\'\>

There are four functions to remember: json.dumps() (dump to string), json.dump() (dump to file), json.loads() (load from string), json.load() (load from file). The s at the end stands for "string." The indent=2 argument makes the output human-readable with 2-space indentation. Python dicts map naturally to JSON objects, lists to JSON arrays, strings to JSON strings, and so on. One caveat: JSON does not support Python-specific types like tuples, sets, or datetime objects — you must convert them first.

## The os and pathlib Modules

For file system operations (checking if files exist, creating directories, listing files, getting file properties), Python provides two options: the older os module and the more modern pathlib module. pathlib uses an object-oriented approach and is generally preferred in new code.

> from pathlib import Path
>
> \# Check if a file or directory exists
>
> print(Path(\"data.txt\").exists()) \# True or False
>
> print(Path(\"data.txt\").is_file()) \# True if it exists AND is a file
>
> \# Create directories (parents=True creates intermediate dirs)
>
> Path(\"output/reports\").mkdir(parents=True, exist_ok=True)
>
> \# List all .py files in a directory
>
> for py_file in Path(\".\").glob(\"\*.py\"):
>
> print(py_file) \# main.py, utils.py, etc.
>
> \# Get parts of a file path
>
> p = Path(\"data/reports/annual_2026.csv\")
>
> print(p.stem) \# \'annual_2026\' (filename without extension)
>
> print(p.suffix) \# \'.csv\' (file extension)
>
> print(p.parent) \# \'data/reports\' (parent directory)
>
> print(p.name) \# \'annual_2026.csv\' (full filename)

pathlib.Path objects represent file system paths as objects with methods, making code more readable than string manipulation. The .glob() method supports wildcard patterns: \*.py matches all Python files, \*\*/\*.py matches Python files in all subdirectories. exist_ok=True in mkdir() prevents an error if the directory already exists. The .stem, .suffix, .parent properties let you decompose paths cleanly without string splitting.

## Practice Exercises

**Exercise 1:** Write a program that reads a text file, counts the number of lines, words, and characters, and prints the results (similar to the Unix wc command).

**Hint:** *Open the file and read all lines. Count lines with len(lines), words by splitting each line and summing the lengths, characters by summing len(line) for each line.*

## Solution:

> def word_count(filename):
>
> with open(filename, \"r\") as f:
>
> lines = f.readlines()
>
> num_lines = len(lines)
>
> num_words = sum(len(line.split()) for line in lines)
>
> num_chars = sum(len(line) for line in lines)
>
> print(f\"Lines: {num_lines}\")
>
> print(f\"Words: {num_words}\")
>
> print(f\"Characters: {num_chars}\")

**Exercise 2:** Write a program that reads a CSV of students (Name, Math, Science, English), calculates each student's average, and writes results to a new CSV with an added Average column.

**Hint:** *Use csv.DictReader to read. For each row, compute average of the three numeric columns (cast from string to int), add the Average field. Write with csv.DictWriter using the extended fieldnames.*

## Solution:

> import csv
>
> with open(\"students.csv\", \"r\") as infile:
>
> reader = csv.DictReader(infile)
>
> rows = list(reader)
>
> for row in rows:
>
> avg = (int(row\[\"Math\"\]) + int(row\[\"Science\"\]) + int(row\[\"English\"\])) / 3
>
> row\[\"Average\"\] = f\"{avg:.2f}\"
>
> fieldnames = list(rows\[0\].keys())
>
> with open(\"results.csv\", \"w\", newline=\"\") as outfile:
>
> writer = csv.DictWriter(outfile, fieldnames=fieldnames)
>
> writer.writeheader()
>
> writer.writerows(rows)

**Exercise 3:** Write a simple contact book that stores contacts in a JSON file. Support adding a contact and searching by name.

**Hint:** *Load the JSON file at startup (or start with empty list). Each contact is a dict with name and phone. Use json.load/json.dump for persistence.*

## Solution:

> import json
>
> from pathlib import Path
>
> FILE = \"contacts.json\"
>
> def load_contacts():
>
> if Path(FILE).exists():
>
> with open(FILE, \"r\") as f:
>
> return json.load(f)
>
> return \[\]
>
> def save_contacts(contacts):
>
> with open(FILE, \"w\") as f:
>
> json.dump(contacts, f, indent=2)
>
> def add_contact(contacts):
>
> name = input(\"Name: \")
>
> phone = input(\"Phone: \")
>
> contacts.append({\"name\": name, \"phone\": phone})
>
> save_contacts(contacts)
>
> def search(contacts, query):
>
> return \[c for c in contacts if query.lower() in c\[\"name\"\].lower()\]


---

# Chapter 8: Error Handling

Errors are inevitable in programming. Users enter unexpected input, files go missing, networks fail, and edge cases appear where you least expect them. What separates robust software from fragile code is how it handles these errors. Python has a comprehensive exception handling system that lets you catch errors gracefully, respond appropriately, and keep your program running.

Python distinguishes between two types of errors: syntax errors (typos or structural mistakes caught before your code runs) and exceptions (errors that occur during execution, like dividing by zero or accessing a missing file). This chapter focuses on exceptions and how to handle them.

## Common Exception Types

Python has a hierarchy of built-in exception classes. Here are the ones you will encounter most often:

-   ValueError — The value is the right type but is inappropriate. Example: int(\"hello\") passes a string (correct type for int's argument) but the content cannot be converted to an integer.

-   TypeError — An operation is applied to incompatible types. Example: \"hello\" + 5 tries to add a string and an integer.

-   KeyError — A dictionary key is not found. Example: my_dict\[\"nonexistent_key\"\].

-   IndexError — A list index is out of range. Example: my_list\[100\] when the list has only 5 elements.

-   FileNotFoundError — The specified file does not exist. Example: open(\"missing_file.txt\").

-   ZeroDivisionError — Division or modulo by zero. Example: 10 / 0.

-   AttributeError — An object does not have the requested attribute. Example: \"hello\".append(\"x\") (strings do not have append).

-   ImportError / ModuleNotFoundError — A module cannot be imported. Example: import nonexistent_module.

**try-except Blocks**

The try-except block is the fundamental error handling construct. Code that might raise an exception goes in the try block; code that runs if that specific exception occurs goes in the except block.

> try:
>
> num = int(input(\"Enter a number: \"))
>
> print(f\"You entered: {num}\")
>
> except ValueError:
>
> print(\"That is not a valid number!\")

Here is what happens step by step: Python enters the try block and attempts to execute int(input(\...)). If the user types \"42\", the conversion succeeds, the print runs, and the except block is skipped entirely. If the user types \"hello\", int() raises a ValueError, Python immediately stops executing the try block (the print is skipped), jumps to the except ValueError block, and prints the error message. The program continues normally after the except block.

## Catching Multiple Exceptions

You can have multiple except clauses to handle different types of errors differently:

> try:
>
> result = 10 / int(input(\"Enter a divisor: \"))
>
> print(f\"Result: {result}\")
>
> except ValueError:
>
> print(\"Please enter a valid integer.\")
>
> except ZeroDivisionError:
>
> print(\"Cannot divide by zero!\")
>
> except (TypeError, OverflowError) as e:
>
> print(f\"Unexpected error: {e}\")

Python checks except clauses from top to bottom and executes the first one that matches the raised exception. If the user types \"abc\", a ValueError is caught. If the user types \"0\", the int() succeeds but the division raises ZeroDivisionError. The last except clause catches two exception types using a tuple and stores the exception object in the variable e, so you can print its message. The as e pattern is useful for logging or displaying error details.

## The else and finally Clauses

try-except can be extended with two optional clauses: else runs only if no exception occurred (the happy path), and finally runs no matter what — exception or not, even if a return statement is encountered. finally is perfect for cleanup operations.

> try:
>
> f = open(\"data.txt\", \"r\")
>
> content = f.read()
>
> except FileNotFoundError:
>
> print(\"File not found!\")
>
> else:
>
> \# This runs ONLY if no exception was raised
>
> print(f\"File has {len(content)} characters\")
>
> finally:
>
> \# This runs ALWAYS, no matter what happened above
>
> print(\"Cleanup done.\")

The else block is useful for keeping the try block minimal — only the lines that might raise exceptions should be in try, and the code that processes the successful result goes in else. This makes it clear which errors you are catching and prevents accidentally catching exceptions from code that should not be protected. The finally block is commonly used for releasing resources: closing files, closing database connections, or releasing locks.

## Raising Exceptions

You are not limited to handling exceptions — you can also raise them explicitly using the raise keyword. This is how you signal errors in your own code.

> def set_age(age):
>
> if not isinstance(age, int):
>
> raise TypeError(\"Age must be an integer\")
>
> if age \< 0 or age \> 150:
>
> raise ValueError(\"Age must be between 0 and 150\")
>
> return age
>
> try:
>
> set_age(-5)
>
> except ValueError as e:
>
> print(f\"Error: {e}\") \# Error: Age must be between 0 and 150

This function validates its input and raises descriptive exceptions when something is wrong. isinstance() checks if age is an integer, and the range check ensures it is reasonable. The string passed to the exception constructor becomes the error message, accessible via str(e) or printing e. Raising exceptions early (at the point where bad data is detected) is called "failing fast" and makes debugging much easier than letting bad data propagate through your program.

## Custom Exceptions

For larger applications, creating your own exception classes makes error handling more precise and descriptive. Custom exceptions are created by inheriting from Python's built-in Exception class.

> class InsufficientFundsError(Exception):
>
> def \_\_init\_\_(self, balance, amount):
>
> self.balance = balance
>
> self.amount = amount
>
> super().\_\_init\_\_(
>
> f\"Cannot withdraw \${amount:.2f}. Balance: \${balance:.2f}\"
>
> )
>
> def withdraw(balance, amount):
>
> if amount \> balance:
>
> raise InsufficientFundsError(balance, amount)
>
> return balance - amount
>
> try:
>
> new_balance = withdraw(100.00, 150.00)
>
> except InsufficientFundsError as e:
>
> print(e) \# Cannot withdraw \$150.00. Balance: \$100.00
>
> print(e.balance) \# 100.0 (access custom attributes)
>
> print(e.amount) \# 150.0

Our custom InsufficientFundsError stores both the balance and the attempted withdrawal amount as attributes. The super().\_\_init\_\_() call passes a formatted message to the parent Exception class. When caught, the caller can access both the human-readable message (via print(e)) and the structured data (via e.balance, e.amount) for programmatic handling. This is much more useful than a generic ValueError with just a string.

## Best Practices

Following these principles will make your error handling robust and maintainable:

-   Be specific: always catch specific exception types, not bare except: (which catches everything, including keyboard interrupts and system exits).

-   Don't silence errors: except: pass hides bugs completely. At minimum, log the error so you know something went wrong.

-   Use else for success code: keep the try block minimal and put success-path logic in else.

-   Use finally for cleanup: closing files, database connections, releasing locks — or better yet, use context managers (with statements).

-   Fail fast: validate inputs at the boundary (function entry, user input, API request) and raise exceptions immediately when invalid data is detected.

-   Custom exceptions for domains: create meaningful exception classes for your application's error cases instead of reusing ValueError for everything.

## Practice Exercises

**Exercise 1:** Write a function safe_divide(a, b) that returns a/b but handles ZeroDivisionError and TypeError gracefully with informative messages. Return None on error.

**Hint:** *Use try-except with two except clauses. ZeroDivisionError catches division by zero. TypeError catches cases like dividing a string by a number.*

## Solution:

> def safe_divide(a, b):
>
> try:
>
> return a / b
>
> except ZeroDivisionError:
>
> print(\"Error: Cannot divide by zero.\")
>
> return None
>
> except TypeError:
>
> print(\"Error: Both arguments must be numbers.\")
>
> return None
>
> print(safe_divide(10, 3)) \# 3.333\...
>
> print(safe_divide(10, 0)) \# None (with error message)
>
> print(safe_divide(10, \"a\")) \# None (with error message)

**Exercise 2:** Create a custom exception InvalidEmailError and a function validate_email(email) that raises it when the email lacks exactly one @ or has no dot in the domain part.

**Hint:** *Count @ symbols with .count(\"@\"). Split on @ and check the domain for a dot. Raise your custom exception with a descriptive message.*

## Solution:

> class InvalidEmailError(Exception):
>
> pass
>
> def validate_email(email):
>
> if email.count(\"@\") != 1:
>
> raise InvalidEmailError(f\"Invalid email: {email}\")
>
> local, domain = email.split(\"@\")
>
> if \".\" not in domain:
>
> raise InvalidEmailError(f\"Invalid domain in: {email}\")
>
> if not local:
>
> raise InvalidEmailError(f\"Missing local part: {email}\")
>
> return True
>
> for email in \[\"alice@example.com\", \"bad@email\", \"no-at-sign\"\]:
>
> try:
>
> validate_email(email)
>
> print(f\"{email} is valid\")
>
> except InvalidEmailError as e:
>
> print(f\"Error: {e}\")

**Exercise 3:** Write a function that reads integers from a file (one per line), skipping invalid lines, and returns the list of valid integers.

**Hint:** *Open the file, loop through lines using enumerate() for line numbers, and wrap int(line.strip()) in try-except ValueError to skip bad lines.*

## Solution:

> def read_integers(filename):
>
> numbers = \[\]
>
> with open(filename, \"r\") as f:
>
> for line_num, line in enumerate(f, 1):
>
> try:
>
> numbers.append(int(line.strip()))
>
> except ValueError:
>
> print(f\"Skipping line {line_num}: {line.strip()!r}\")
>
> return numbers


---

# Chapter 9: Modules & Packages

As your programs grow beyond a few dozen lines, putting everything in a single file becomes unmanageable. Modules and packages let you organize code into separate files and directories, making it reusable, testable, and easier to maintain. They also give you access to Python's massive standard library and the even larger ecosystem of third-party packages.

## What is a Module?

A module is simply a .py file containing Python code — functions, classes, variables, or executable statements. When you import a module, Python executes the code in that file and makes its contents available under the module's name.

> \# math_utils.py (this is a module)
>
> def add(a, b):
>
> return a + b
>
> def multiply(a, b):
>
> return a \* b
>
> PI = 3.14159

Now you can use this module from another file using several import styles:

> \# main.py
>
> \# Style 1: import the whole module
>
> import math_utils
>
> print(math_utils.add(3, 4)) \# 7 (prefix with module name)
>
> print(math_utils.PI) \# 3.14159
>
> \# Style 2: import specific items
>
> from math_utils import add, PI
>
> print(add(3, 4)) \# 7 (no prefix needed)
>
> \# Style 3: import with an alias (short name)
>
> import math_utils as mu
>
> print(mu.multiply(3, 4)) \# 12
>
> \# Style 4: import everything (use sparingly - pollutes namespace!)
>
> from math_utils import \*

Style 1 (import math_utils) is the safest because it keeps everything under the module's namespace, avoiding name collisions. Style 2 (from \... import) is convenient when you need only a few items and their names are unambiguous. Style 3 (import \... as) is standard for long module names — you will see import numpy as np and import pandas as pd everywhere in data science. Style 4 (import \*) should generally be avoided because it imports every name from the module into your namespace, potentially overwriting your own variables.

## The \_\_name\_\_ Guard

When Python runs a file directly (e.g., python math_utils.py), it sets the special variable \_\_name\_\_ to the string \"\_\_main\_\_\". When the file is imported as a module, \_\_name\_\_ is set to the module's name (e.g., \"math_utils\"). This lets you include code that runs only when the file is executed directly, not when it is imported.

> \# math_utils.py
>
> def add(a, b):
>
> return a + b
>
> if \_\_name\_\_ == \"\_\_main\_\_\":
>
> \# This block runs ONLY when math_utils.py is executed directly
>
> \# It does NOT run when another file imports math_utils
>
> print(add(2, 3)) \# 5
>
> print(\"Running tests\...\")

This pattern is essential for writing reusable modules. Without it, any test code or scripts at the module level would execute every time someone imports your module, which is unexpected behavior. The \_\_name\_\_ guard lets you include test code, demonstrations, or a main() function in the same file as your library code.

## Standard Library Highlights

Python's standard library ships with hundreds of modules — it is often described as having "batteries included." Here are some of the most useful ones you should know:

**math — Mathematical Functions**

> import math
>
> print(math.sqrt(16)) \# 4.0 (square root)
>
> print(math.ceil(4.2)) \# 5 (round up to nearest integer)
>
> print(math.floor(4.8)) \# 4 (round down to nearest integer)
>
> print(math.pi) \# 3.141592653589793
>
> print(math.log(100, 10)) \# 2.0 (log base 10 of 100)

The math module provides mathematical functions that operate on floats: square roots, trigonometry (sin, cos, tan), logarithms, constants (π, e), and more. These are implemented in C for speed and are more precise than writing your own versions.

**random — Random Numbers**

> import random
>
> print(random.randint(1, 10)) \# Random int between 1 and 10 (inclusive)
>
> print(random.random()) \# Random float between 0.0 and 1.0
>
> print(random.choice(\[\"a\", \"b\", \"c\"\])) \# Pick one random element
>
> deck = list(range(1, 53))
>
> random.shuffle(deck) \# Shuffle the list in place
>
> hand = random.sample(deck, 5) \# Pick 5 without replacement

random.randint(a, b) is inclusive on both ends (unlike range). random.choice() picks one element from a sequence. random.shuffle() reorders a list in place (returns None). random.sample() picks k items without replacement and returns a new list. For security-sensitive applications (passwords, tokens), use the secrets module instead of random.

**datetime — Dates and Times**

> from datetime import datetime, timedelta
>
> now = datetime.now() \# Current date and time
>
> print(now.strftime(\"%Y-%m-%d %H:%M:%S\")) \# Format: 2026-03-27 14:30:00
>
> \# Date arithmetic with timedelta
>
> tomorrow = now + timedelta(days=1)
>
> last_week = now - timedelta(weeks=1)
>
> \# Parse a date string into a datetime object
>
> date = datetime.strptime(\"2026-03-27\", \"%Y-%m-%d\")

datetime.now() gives you the current moment. strftime() (string from time) formats a datetime into a string using codes like %Y (4-digit year), %m (month), %d (day), %H (24-hour hour), %M (minute), %S (second). strptime() (string parse time) does the reverse: it parses a string into a datetime. timedelta represents a duration and supports arithmetic with datetimes — adding 1 day, subtracting 2 weeks, etc.

## What is a Package?

A package is a directory containing Python modules, organized with a special \_\_init\_\_.py file. It lets you create hierarchies of modules for large projects.

> \# Directory structure:
>
> \# mypackage/
>
> \# \_\_init\_\_.py \# Makes this directory a package
>
> \# math_ops.py \# A module inside the package
>
> \# string_ops.py \# Another module
>
> \# sub_package/ \# A sub-package
>
> \# \_\_init\_\_.py
>
> \# advanced.py
>
> \# Usage:
>
> from mypackage import math_ops
>
> from mypackage.sub_package import advanced

The \_\_init\_\_.py file can be empty (just signals "this is a package") or can contain initialization code that runs when the package is imported. Packages let you organize large codebases into logical groupings (e.g., a web application might have packages for models, views, utils, tests).

## Installing Third-Party Packages with pip

pip is Python's package manager. It downloads and installs packages from PyPI (the Python Package Index), which hosts over 400,000 packages.

> pip install requests \# Install a package
>
> pip install requests==2.31.0 \# Install a specific version
>
> pip list \# List all installed packages
>
> pip freeze \> requirements.txt \# Save dependency list to a file
>
> pip install -r requirements.txt \# Install all dependencies from file

The requirements.txt file is how Python projects declare their dependencies. When you share your project, others can run pip install -r requirements.txt to install everything they need. For production projects, always pin specific versions (like requests==2.31.0) to prevent breaking changes.

## Virtual Environments

Virtual environments are isolated Python installations for each project. Without them, all projects share the same packages, which leads to version conflicts (Project A needs requests 2.28, Project B needs requests 2.31). Virtual environments solve this by giving each project its own independent set of packages.

> \# Create a virtual environment named \'myenv\'
>
> python -m venv myenv
>
> \# Activate it (creates an isolated environment)
>
> \# Windows: myenv\\Scripts\\activate
>
> \# macOS/Linux: source myenv/bin/activate
>
> \# Now pip installs packages ONLY into this environment
>
> pip install flask
>
> \# Deactivate when done (return to system Python)
>
> deactivate

When you activate a virtual environment, your terminal's python and pip commands point to the environment's copies, not the system-wide ones. Any packages you install go into the environment's directory and are completely isolated from other projects. This is considered an essential practice for all Python development. Most IDEs (VS Code, PyCharm) detect and manage virtual environments automatically.

## Practice Exercises

**Exercise 1:** Create a module called geometry.py with functions area_circle(r), area_rectangle(l, w), and area_triangle(b, h). Then import and use them from a main.py file.

**Hint:** *Use math.pi for the circle. Formulas: circle = πr², rectangle = l×w, triangle = ½b×h. In main.py, use from geometry import \... to bring in the functions.*

## Solution:

> \# geometry.py
>
> import math
>
> def area_circle(r):
>
> return math.pi \* r \*\* 2
>
> def area_rectangle(l, w):
>
> return l \* w
>
> def area_triangle(b, h):
>
> return 0.5 \* b \* h
>
> \# main.py
>
> from geometry import area_circle, area_rectangle, area_triangle
>
> print(f\"Circle (r=5): {area_circle(5):.2f}\")
>
> print(f\"Rectangle (4x6): {area_rectangle(4, 6)}\")
>
> print(f\"Triangle (b=3, h=8): {area_triangle(3, 8)}\")

**Exercise 2:** Write a script that uses datetime to calculate how many days are left until New Year's Day 2027.

**Hint:** *Create a datetime for Jan 1, 2027 using datetime(2027, 1, 1). Subtract datetime.now() from it. The result is a timedelta whose .days attribute gives the answer.*

## Solution:

> from datetime import datetime
>
> now = datetime.now()
>
> new_year = datetime(2027, 1, 1)
>
> delta = new_year - now
>
> print(f\"Days until New Year 2027: {delta.days}\")

**Exercise 3:** Write a password generator script that creates a random password of given length containing uppercase, lowercase, digits, and special characters.

**Hint:** *Use the string module for character pools: string.ascii_letters (a-zA-Z), string.digits (0-9), string.punctuation (special chars). Combine them and use random.choices() to pick characters.*

## Solution:

> import random
>
> import string
>
> def generate_password(length=16):
>
> pool = string.ascii_letters + string.digits + string.punctuation
>
> password = \"\".join(random.choices(pool, k=length))
>
> return password
>
> print(generate_password()) \# e.g. \'kQ7\$mZ!pL2@nR4&x\'
>
> print(generate_password(8)) \# e.g. \'aB3#fG7!\'


---

# Chapter 10: Object-Oriented Programming

Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects — entities that bundle data (attributes) and behavior (methods) together. Instead of writing procedures that operate on data, you create objects that contain both the data and the operations that manipulate it. This mirrors how we think about the real world: a car has properties (color, speed, fuel level) and actions (accelerate, brake, refuel).

Python is a multi-paradigm language (you can write procedural, functional, or object-oriented code), but OOP is deeply embedded in its design. In fact, everything in Python is an object: integers, strings, lists, functions — they all have types (classes) and methods. When you call \"hello\".upper(), you are calling the upper() method on a string object.

## Classes and Objects

A class is a blueprint or template for creating objects. An object (also called an instance) is a specific realization of that class, with its own unique data. The relationship is like the difference between the concept of "a dog" (the class) and your specific dog named Buddy (an instance).

> class Dog:
>
> \"\"\"A simple Dog class.\"\"\"
>
> def \_\_init\_\_(self, name, breed, age):
>
> self.name = name \# Instance attribute
>
> self.breed = breed
>
> self.age = age
>
> def bark(self):
>
> return f\"{self.name} says: Woof!\"
>
> def info(self):
>
> return f\"{self.name} is a {self.age}-year-old {self.breed}\"
>
> \# Creating objects (instances) from the class
>
> dog1 = Dog(\"Buddy\", \"Golden Retriever\", 3)
>
> dog2 = Dog(\"Max\", \"German Shepherd\", 5)
>
> print(dog1.bark()) \# Buddy says: Woof!
>
> print(dog2.info()) \# Max is a 5-year-old German Shepherd

Let us walk through this carefully. The class Dog: line defines a new class. \_\_init\_\_ is the constructor (initializer) — it runs automatically whenever you create a new Dog instance. The self parameter refers to the specific instance being created: when you write Dog(\"Buddy\", \...), Python calls \_\_init\_\_ with self pointing to the newly created object, and self.name = name stores \"Buddy\" as that instance's name attribute.

The bark() and info() methods are functions that belong to the class. Every instance method takes self as its first parameter, which gives it access to the instance's data. When you call dog1.bark(), Python automatically passes dog1 as self, so self.name inside the method resolves to \"Buddy\".

We created two independent instances: dog1 and dog2. Each has its own name, breed, and age. Changing dog1.age does not affect dog2.age — they are separate objects in memory.

## Class Attributes vs Instance Attributes

Instance attributes (set with self.something in \_\_init\_\_) are unique to each object. Class attributes (defined directly inside the class body) are shared by all instances of that class.

> class Employee:
>
> company = \"TechCorp\" \# Class attribute: shared by ALL employees
>
> employee_count = 0 \# Also a class attribute
>
> def \_\_init\_\_(self, name, salary):
>
> self.name = name \# Instance attribute: unique per employee
>
> self.salary = salary
>
> Employee.employee_count += 1 \# Modify the class attribute
>
> e1 = Employee(\"Alice\", 80000)
>
> e2 = Employee(\"Bob\", 75000)
>
> print(Employee.company) \# TechCorp
>
> print(Employee.employee_count) \# 2 (both instances incremented it)
>
> print(e1.company) \# TechCorp (accessible via instance too)

The company and employee_count attributes belong to the class itself, not to any specific instance. When we access e1.company, Python first looks for company on the instance e1, does not find it, and falls back to the class. The employee_count is incremented in \_\_init\_\_, so every time a new Employee is created, the count goes up. This is useful for tracking how many instances exist, defining constants, or setting default values.

## Encapsulation

Encapsulation is the principle of controlling access to an object's internal data. It prevents outside code from directly modifying an object's state in unexpected ways. Python uses naming conventions (rather than strict enforcement like Java's private keyword) to signal access intent:

-   public: name — accessible everywhere. This is the default for all attributes.

-   protected: \_name — a convention meaning "internal use, don't access from outside." Still technically accessible.

-   private: \_\_name — Python name-mangles this to \_ClassName\_\_name, making accidental access from outside harder.

> class BankAccount:
>
> def \_\_init\_\_(self, owner, balance=0):
>
> self.owner = owner \# Public
>
> self.\_\_balance = balance \# Private (name-mangled)
>
> def deposit(self, amount):
>
> if amount \> 0:
>
> self.\_\_balance += amount
>
> return f\"Deposited \${amount}. Balance: \${self.\_\_balance}\"
>
> raise ValueError(\"Deposit must be positive\")
>
> def withdraw(self, amount):
>
> if 0 \< amount \<= self.\_\_balance:
>
> self.\_\_balance -= amount
>
> return f\"Withdrew \${amount}. Balance: \${self.\_\_balance}\"
>
> raise ValueError(\"Invalid withdrawal amount\")
>
> \@property
>
> def balance(self):
>
> \"\"\"Read-only access to balance via property.\"\"\"
>
> return self.\_\_balance
>
> acc = BankAccount(\"Alice\", 1000)
>
> print(acc.balance) \# 1000 (reads via the property)
>
> print(acc.deposit(500)) \# Deposited \$500. Balance: \$1500
>
> \# acc.\_\_balance \# AttributeError! (name-mangled)
>
> \# acc.\_BankAccount\_\_balance \# 1500 (technically accessible, but don\'t!)

The \_\_balance attribute is name-mangled to \_BankAccount\_\_balance, so acc.\_\_balance raises an AttributeError. The \@property decorator creates a read-only "getter" that looks like an attribute when accessed (acc.balance, not acc.balance()). This means external code can read the balance but can only modify it through the controlled deposit() and withdraw() methods, which enforce business rules (positive amounts, sufficient funds). This is encapsulation in action: the internal state is protected, and changes are mediated through a controlled interface.

## Inheritance

Inheritance lets you create a new class (child/subclass) that inherits attributes and methods from an existing class (parent/superclass). The child class can use everything from the parent, override specific methods, and add new functionality. This promotes code reuse and models "is-a" relationships (a Dog is an Animal).

> class Animal:
>
> def \_\_init\_\_(self, name, species):
>
> self.name = name
>
> self.species = species
>
> def speak(self):
>
> return f\"{self.name} makes a sound\"
>
> def \_\_str\_\_(self):
>
> return f\"{self.name} ({self.species})\"
>
> class Dog(Animal): \# Dog INHERITS from Animal
>
> def \_\_init\_\_(self, name, breed):
>
> super().\_\_init\_\_(name, \"Dog\") \# Call parent\'s \_\_init\_\_
>
> self.breed = breed \# Add Dog-specific attribute
>
> def speak(self): \# OVERRIDE parent\'s speak method
>
> return f\"{self.name} says: Woof!\"
>
> def fetch(self, item): \# NEW method, only for Dogs
>
> return f\"{self.name} fetches the {item}\"
>
> class Cat(Animal):
>
> def \_\_init\_\_(self, name, indoor=True):
>
> super().\_\_init\_\_(name, \"Cat\")
>
> self.indoor = indoor
>
> def speak(self):
>
> return f\"{self.name} says: Meow!\"
>
> dog = Dog(\"Buddy\", \"Labrador\")
>
> cat = Cat(\"Whiskers\")
>
> print(dog.speak()) \# Buddy says: Woof! (Dog\'s version)
>
> print(cat.speak()) \# Whiskers says: Meow! (Cat\'s version)
>
> print(dog.fetch(\"ball\")) \# Buddy fetches the ball (Dog-only)
>
> print(isinstance(dog, Animal)) \# True (Dog IS an Animal)

The class Dog(Animal) syntax means Dog inherits from Animal. In Dog's \_\_init\_\_, super().\_\_init\_\_(name, \"Dog\") calls the parent class's constructor to set up name and species. The super() function gives you access to the parent class's methods. Dog overrides speak() with its own version (method overriding), and adds a new method fetch() that only Dogs have. The isinstance() function confirms that a Dog instance is also considered an Animal, which makes sense: every dog is an animal.

## Polymorphism

Polymorphism (Greek for "many forms") means that different classes can have methods with the same name but different implementations. This lets you write code that works with objects of any class, as long as they implement the expected interface. You do not need to know the exact type of an object — just that it has the method you need.

> \# All these classes have a speak() method
>
> animals = \[Dog(\"Rex\", \"Husky\"), Cat(\"Luna\"), Animal(\"Parrot\", \"Bird\")\]
>
> for animal in animals:
>
> print(animal.speak()) \# Each calls its OWN version of speak()
>
> \# Rex says: Woof! (Dog.speak)
>
> \# Luna says: Meow! (Cat.speak)
>
> \# Parrot makes a sound (Animal.speak)

This is powerful: the for loop does not care whether each object is a Dog, Cat, or generic Animal. It just calls speak() on each one, and the correct version runs automatically. This is called dynamic dispatch — the method that gets called is determined at runtime by the actual type of the object, not by the declared type of the variable. Polymorphism is the key enabler for writing flexible, extensible code.

## Special (Dunder) Methods

Python uses double-underscore methods (called dunder methods or magic methods) to integrate your custom classes with Python's built-in operators and functions. By defining these methods, your objects can work with +, -, ==, len(), print(), sorted(), and more.

> class Vector:
>
> def \_\_init\_\_(self, x, y):
>
> self.x = x
>
> self.y = y
>
> def \_\_repr\_\_(self): \# Called by repr() and in the REPL
>
> return f\"Vector({self.x}, {self.y})\"
>
> def \_\_str\_\_(self): \# Called by print() and str()
>
> return f\"({self.x}, {self.y})\"
>
> def \_\_add\_\_(self, other): \# Enables v1 + v2
>
> return Vector(self.x + other.x, self.y + other.y)
>
> def \_\_eq\_\_(self, other): \# Enables v1 == v2
>
> return self.x == other.x and self.y == other.y
>
> def \_\_abs\_\_(self): \# Enables abs(v)
>
> return (self.x\*\*2 + self.y\*\*2)\*\*0.5
>
> v1 = Vector(3, 4)
>
> v2 = Vector(1, 2)
>
> print(v1 + v2) \# (4, 6) (\_\_add\_\_ lets + work)
>
> print(v1 == v2) \# False (\_\_eq\_\_ lets == work)
>
> print(abs(v1)) \# 5.0 (\_\_abs\_\_ lets abs() work)
>
> print(repr(v1)) \# Vector(3, 4) (\_\_repr\_\_ for debugging)

\_\_repr\_\_ should return a string that looks like a valid Python expression to recreate the object — it is for developers. \_\_str\_\_ should return a human-friendly string — it is for end users. \_\_add\_\_ is called when you use the + operator: v1 + v2 becomes v1.\_\_add\_\_(v2). \_\_eq\_\_ is called for ==. \_\_abs\_\_ is called by the abs() function. There are dunder methods for virtually every operator: \_\_sub\_\_ for -, \_\_mul\_\_ for \*, \_\_lt\_\_ for \<, \_\_len\_\_ for len(), \_\_getitem\_\_ for indexing with \[\], and many more. This system is what makes Python feel so consistent and elegant.

## Class Methods and Static Methods

Beyond regular instance methods, Python supports two special types: class methods (which receive the class as their first argument instead of an instance) and static methods (which receive neither the class nor an instance — they are just functions that live inside the class for organizational purposes).

> class Date:
>
> def \_\_init\_\_(self, year, month, day):
>
> self.year = year
>
> self.month = month
>
> self.day = day
>
> \@classmethod
>
> def from_string(cls, date_string):
>
> \"\"\"Alternative constructor: create a Date from a string.\"\"\"
>
> year, month, day = map(int, date_string.split(\"-\"))
>
> return cls(year, month, day) \# cls is the class itself (Date)
>
> \@staticmethod
>
> def is_leap_year(year):
>
> \"\"\"Utility function: no access to cls or self needed.\"\"\"
>
> return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
>
> def \_\_str\_\_(self):
>
> return f\"{self.year}-{self.month:02d}-{self.day:02d}\"
>
> d1 = Date(2026, 3, 27) \# Regular constructor
>
> d2 = Date.from_string(\"2026-03-27\") \# Class method as alt constructor
>
> print(Date.is_leap_year(2024)) \# True (static: no instance needed)

Class methods (decorated with \@classmethod) receive cls instead of self. The most common use is as alternative constructors: from_string creates a Date from a string format, which is cleaner than expecting the user to parse the string themselves. cls(year, month, day) calls the class's constructor, and since it uses cls rather than Date, it works correctly even with subclasses.

Static methods (decorated with \@staticmethod) are utility functions that do not need access to the instance or the class. is_leap_year only needs a year number — it does not depend on any Date instance's state. It could be a standalone function, but putting it inside Date organizes it with the class it logically belongs to.

## Abstract Base Classes

Sometimes you want to define an interface — a set of methods that subclasses must implement — without providing a default implementation. Abstract Base Classes (ABCs) enforce this: if a subclass fails to implement an abstract method, Python raises a TypeError when you try to instantiate it.

> from abc import ABC, abstractmethod
>
> class Shape(ABC): \# Abstract base class
>
> \@abstractmethod
>
> def area(self):
>
> pass \# No implementation - subclasses MUST override this
>
> \@abstractmethod
>
> def perimeter(self):
>
> pass
>
> class Circle(Shape): \# Concrete class: implements all abstract methods
>
> def \_\_init\_\_(self, radius):
>
> self.radius = radius
>
> def area(self):
>
> import math
>
> return math.pi \* self.radius \*\* 2
>
> def perimeter(self):
>
> import math
>
> return 2 \* math.pi \* self.radius
>
> \# shape = Shape() \# TypeError: Can\'t instantiate abstract class!
>
> c = Circle(5) \# Works: Circle implements both abstract methods
>
> print(f\"Area: {c.area():.2f}\") \# Area: 78.54

Shape(ABC) makes Shape an abstract class. The \@abstractmethod decorator marks methods that must be overridden. You cannot create a Shape() directly — it is meant only to be a base class. Circle extends Shape and provides implementations for both area() and perimeter(), so it can be instantiated. If Circle failed to implement one of the abstract methods, Python would raise TypeError at the point where you try to create a Circle instance, not when you try to call the method. This catches errors early.

## Composition vs Inheritance

Inheritance models an "is-a" relationship: a Dog is an Animal. Composition models a "has-a" relationship: a Car has an Engine. A widely followed design principle states: "prefer composition over inheritance" when both are possible. Composition is more flexible because you can swap out components at runtime.

> class Engine:
>
> def \_\_init\_\_(self, horsepower):
>
> self.horsepower = horsepower
>
> def start(self):
>
> return f\"{self.horsepower}HP engine started\"
>
> class Car:
>
> def \_\_init\_\_(self, make, model, hp):
>
> self.make = make
>
> self.model = model
>
> self.engine = Engine(hp) \# Composition: Car HAS an Engine
>
> def start(self):
>
> return f\"{self.make} {self.model}: {self.engine.start()}\"
>
> car = Car(\"Toyota\", \"Camry\", 203)
>
> print(car.start()) \# Toyota Camry: 203HP engine started

Car does not inherit from Engine — that would be nonsensical (a car is not an engine). Instead, Car creates an Engine instance and stores it as self.engine. When car.start() is called, it delegates the engine-starting logic to self.engine.start(). This is cleaner, more modular, and easier to change — you could swap in a different Engine subclass (ElectricEngine, DieselEngine) without modifying the Car class.

## Practice Exercises

**Exercise 1:** Create a Student class with attributes: name, roll_number, grades (list of floats). Add methods: add_grade(grade), average_grade(), and highest_grade(). Implement \_\_str\_\_ to display student info.

**Hint:** *Initialize grades as an empty list in \_\_init\_\_. add_grade validates and appends. average_grade uses sum()/len(). highest_grade uses max(). \_\_str\_\_ formats a readable string.*

## Solution:

> class Student:
>
> def \_\_init\_\_(self, name, roll_number):
>
> self.name = name
>
> self.roll_number = roll_number
>
> self.grades = \[\]
>
> def add_grade(self, grade):
>
> if 0 \<= grade \<= 100:
>
> self.grades.append(grade)
>
> else:
>
> raise ValueError(\"Grade must be 0-100\")
>
> def average_grade(self):
>
> return sum(self.grades) / len(self.grades) if self.grades else 0
>
> def highest_grade(self):
>
> return max(self.grades) if self.grades else 0
>
> def \_\_str\_\_(self):
>
> return f\"Student({self.name}, Roll: {self.roll_number}, Avg: {self.average_grade():.1f})\"
>
> s = Student(\"Alice\", \"CS101\")
>
> s.add_grade(95); s.add_grade(87); s.add_grade(92)
>
> print(s) \# Student(Alice, Roll: CS101, Avg: 91.3)
>
> print(s.highest_grade()) \# 95

**Exercise 2:** Create a class hierarchy: base class LibraryItem (title, is_checked_out, check_out(), return_item()), and subclasses Book (author, pages) and DVD (director, duration). Each overrides \_\_str\_\_.

**Hint:** *Base class handles checkout logic. Subclasses call super().\_\_init\_\_(title) and add own attributes. \_\_str\_\_ shows type-specific info and checkout status.*

## Solution:

> class LibraryItem:
>
> def \_\_init\_\_(self, title):
>
> self.title = title
>
> self.is_checked_out = False
>
> def check_out(self):
>
> if self.is_checked_out:
>
> raise Exception(f\"{self.title} already checked out\")
>
> self.is_checked_out = True
>
> def return_item(self):
>
> self.is_checked_out = False
>
> class Book(LibraryItem):
>
> def \_\_init\_\_(self, title, author, pages):
>
> super().\_\_init\_\_(title)
>
> self.author = author
>
> self.pages = pages
>
> def \_\_str\_\_(self):
>
> s = \"Out\" if self.is_checked_out else \"Available\"
>
> return f\"Book: {self.title} by {self.author} ({self.pages}p) \[{s}\]\"
>
> class DVD(LibraryItem):
>
> def \_\_init\_\_(self, title, director, duration):
>
> super().\_\_init\_\_(title)
>
> self.director = director
>
> self.duration = duration
>
> def \_\_str\_\_(self):
>
> s = \"Out\" if self.is_checked_out else \"Available\"
>
> return f\"DVD: {self.title} dir. {self.director} ({self.duration}min) \[{s}\]\"
>
> book = Book(\"1984\", \"George Orwell\", 328)
>
> print(book) \# Book: 1984 by George Orwell (328p) \[Available\]
>
> book.check_out()
>
> print(book) \# Book: 1984 by George Orwell (328p) \[Out\]

**Exercise 3:** Create an abstract Shape with area() and perimeter(). Implement Circle, Rectangle, and Triangle subclasses. Write total_area(shapes) that sums areas from a list of shapes.

**Hint:** *Use ABC and \@abstractmethod. Circle: πr², Rectangle: w\*h, Triangle: Heron's formula. total_area uses sum() with a generator.*

## Solution:

> from abc import ABC, abstractmethod
>
> import math
>
> class Shape(ABC):
>
> \@abstractmethod
>
> def area(self): pass
>
> \@abstractmethod
>
> def perimeter(self): pass
>
> class Circle(Shape):
>
> def \_\_init\_\_(self, r): self.r = r
>
> def area(self): return math.pi \* self.r \*\* 2
>
> def perimeter(self): return 2 \* math.pi \* self.r
>
> class Rectangle(Shape):
>
> def \_\_init\_\_(self, w, h): self.w, self.h = w, h
>
> def area(self): return self.w \* self.h
>
> def perimeter(self): return 2 \* (self.w + self.h)
>
> class Triangle(Shape):
>
> def \_\_init\_\_(self, a, b, c): self.a, self.b, self.c = a, b, c
>
> def area(self):
>
> s = (self.a + self.b + self.c) / 2
>
> return math.sqrt(s\*(s-self.a)\*(s-self.b)\*(s-self.c))
>
> def perimeter(self): return self.a + self.b + self.c
>
> def total_area(shapes):
>
> return sum(s.area() for s in shapes)
>
> shapes = \[Circle(5), Rectangle(4, 6), Triangle(3, 4, 5)\]
>
> print(f\"Total: {total_area(shapes):.2f}\") \# \~108.54

**Exercise 4:** Build a Card class (suit, rank) and a Deck class with 52 cards, shuffle(), deal(n), and \_\_len\_\_(). Simulate dealing a 5-card hand.

**Hint:** *Card stores suit and rank with \_\_repr\_\_. Deck generates all combinations in \_\_init\_\_. Use random.shuffle for shuffle and list slicing for deal.*

## Solution:

> import random
>
> class Card:
>
> def \_\_init\_\_(self, suit, rank):
>
> self.suit = suit
>
> self.rank = rank
>
> def \_\_repr\_\_(self):
>
> return f\"{self.rank} of {self.suit}\"
>
> class Deck:
>
> SUITS = \[\"Hearts\", \"Diamonds\", \"Clubs\", \"Spades\"\]
>
> RANKS = \[\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"J\",\"Q\",\"K\",\"A\"\]
>
> def \_\_init\_\_(self):
>
> self.cards = \[Card(s, r) for s in self.SUITS for r in self.RANKS\]
>
> def shuffle(self):
>
> random.shuffle(self.cards)
>
> def deal(self, n=1):
>
> dealt = self.cards\[:n\]
>
> self.cards = self.cards\[n:\]
>
> return dealt
>
> def \_\_len\_\_(self):
>
> return len(self.cards)
>
> deck = Deck()
>
> deck.shuffle()
>
> hand = deck.deal(5)
>
> print(f\"Hand: {hand}\")
>
> print(f\"Remaining: {len(deck)}\") \# 47


---

## THE COMPLETE PYTHON

## PROGRAMMING GUIDE

*From Zero to Object-Oriented Programming*

A Complete Article-Based Learning Resource

with Code Snippets, Exercises & Solutions

2026 Edition
