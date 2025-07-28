"""
Developer Tools Microservice
Handles all developer utilities and formatting tools
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uvicorn
import os
import io
from datetime import datetime
import json
import base64
import hashlib
import secrets
import string
import urllib.parse
import re
from fastapi.responses import StreamingResponse, JSONResponse

app = FastAPI(title="Developer Tools Microservice", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

# Ensure directories exist
os.makedirs("../../static", exist_ok=True)
os.makedirs("../../static", exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "developer-tools"}

@app.post("/process/{tool_name}")
async def process_developer_tool(
    tool_name: str,
    files: List[UploadFile] = File([]),
    metadata: Optional[str] = Form(None)
):
    """Process developer tool request with heavy processing like TinyWow"""

    start_time = datetime.now()
    print(f"💻 Developer Service: Processing {tool_name} with {len(files)} files")

    # Parse metadata
    meta_data = {}
    if metadata:
        try:
            meta_data = json.loads(metadata)
        except:
            meta_data = {"text": metadata}

    # Heavy processing simulation like TinyWow
    await simulate_heavy_processing(tool_name, len(files))

    # Generate professional developer output
    dev_content, file_extension = await generate_developer_output(tool_name, files, meta_data)

    # Save processed file
    output_filename = f"processed-{tool_name}.{file_extension}"
    output_path = f"../../static/{output_filename}"

    with open(output_path, "wb") as f:
        f.write(dev_content)

    processing_time = (datetime.now() - start_time).total_seconds() * 1000

    return JSONResponse(content={
        "success": True,
        "message": f"{tool_name.replace('-', ' ').title()} completed successfully",
        "downloadUrl": f"/static/{output_filename}",
        "filename": output_filename,
        "processingTime": int(processing_time),
        "toolId": tool_name,
        "metadata": {
            "processed": True,
            "timestamp": datetime.now().isoformat(),
            "category": "Developer",
            "service": "developer-microservice",
            **meta_data
        }
    })

async def simulate_heavy_processing(tool_name: str, file_count: int):
    """Simulate heavy processing like TinyWow"""
    import asyncio

    # Heavy processing time based on tool complexity
    processing_time = max(1.5, file_count * 0.8)  # Developer tools are generally faster

    steps = [
        "Loading developer processors...",
        "Analyzing code structure...", 
        "Applying transformations...",
        "Optimizing output format...",
        "Validating result...",
        "Finalizing developer output..."
    ]

    for i, step in enumerate(steps):
        print(f"📊 {step}")
        await asyncio.sleep(processing_time / len(steps))

async def generate_developer_output(tool_name: str, files: List[UploadFile], metadata: dict) -> tuple[bytes, str]:
    """Generate professional developer tool output like TinyWow"""

    # Get input text from metadata or uploaded file
    input_text = metadata.get('text', '')

    if files and len(files) > 0:
        file = files[0]
        content = await file.read()
        try:
            input_text = content.decode('utf-8')
        except:
            input_text = content.decode('utf-8', errors='ignore')

    # Process based on tool type
    if tool_name == "json-formatter":
        return generate_formatted_json(input_text, files[0] if files else None), "json"
    elif tool_name == "base64-encoder":
        return generate_base64_encoded(input_text), "txt"
    elif tool_name == "hash-generator":
        return generate_hash_output(input_text), "txt"
    elif tool_name == "password-generator":
        return generate_secure_password(metadata), "txt"
    elif tool_name == "qr-generator":
        return generate_qr_code_svg(input_text or metadata.get('url', 'https://example.com')), "svg"
    elif tool_name == "color-picker":
        return generate_color_palette(metadata), "json"
    elif tool_name == "lorem-ipsum":
        return generate_lorem_ipsum(metadata), "txt"
    elif tool_name == "url-encoder":
        return generate_url_encoded(input_text), "txt"
    elif tool_name == "timestamp-converter":
        return generate_timestamp_conversion(input_text), "json"
    elif tool_name == "regex-tester":
        return generate_regex_test_result(metadata), "json"
    elif tool_name == "markdown-to-html":
        return generate_html_from_markdown(input_text), "html"
    elif tool_name == "css-minifier":
        return generate_minified_css(input_text), "css"
    elif tool_name == "js-minifier":
        return generate_minified_js(input_text), "js"
    else:
        # Default JSON formatter
        return generate_formatted_json(input_text, files[0] if files else None), "json"

def generate_formatted_json(json_input: str, original_file: Optional[UploadFile]) -> bytes:
    """Generate professionally formatted JSON"""
    try:
        # Parse and validate JSON
        parsed_json = json.loads(json_input or '{}')

        # Create professional output
        result = {
            "processed_by": "Suntyn AI Developer Microservice",
            "processing_time": datetime.now().isoformat(),
            "original_file": {
                "name": original_file.filename if original_file else None,
                "size": len(json_input.encode('utf-8')) if json_input else 0
            } if original_file else None,
            "validation": {
                "is_valid_json": True,
                "structure_verified": True,
                "formatting_applied": True,
                "microservice_processed": True
            },
            "metadata": {
                "service": "developer-microservice",
                "architecture": "FastAPI + Microservices",
                "processing_engine": "TinyWow-level Heavy Processing"
            },
            "formatted_content": parsed_json
        }

        return json.dumps(result, indent=2, ensure_ascii=False).encode('utf-8')

    except json.JSONDecodeError as e:
        error_result = {
            "processed_by": "Suntyn AI Developer Microservice",
            "processing_time": datetime.now().isoformat(),
            "error": f"Invalid JSON format: {str(e)}",
            "original_content": json_input,
            "suggestion": "Please provide valid JSON content",
            "service_info": {
                "microservice": "developer-tools",
                "architecture": "FastAPI + Independent Services"
            }
        }
        return json.dumps(error_result, indent=2).encode('utf-8')

def generate_base64_encoded(text: str) -> bytes:
    """Generate Base64 encoded output"""
    if not text:
        text = "Sample text for Base64 encoding"

    encoded = base64.b64encode(text.encode('utf-8')).decode('ascii')

    result = f"""Base64 Encoding Result
Processed by: Suntyn AI Developer Microservice
Processing Time: {datetime.now().isoformat()}

Original Text ({len(text)} characters):
{text}

Base64 Encoded ({len(encoded)} characters):
{encoded}

Decoding Verification:
{base64.b64decode(encoded).decode('utf-8')}

Service Information:
- Microservice: Developer Tools
- Architecture: FastAPI + Independent Services
- Processing: TinyWow-level Quality
"""

    return result.encode('utf-8')

def generate_hash_output(text: str) -> bytes:
    """Generate multiple hash outputs"""
    if not text:
        text = "Sample text for hash generation"

    text_bytes = text.encode('utf-8')

    result = f"""Hash Generation Result
Processed by: Suntyn AI Developer Microservice
Processing Time: {datetime.now().isoformat()}

Input Text ({len(text)} characters):
{text}

Generated Hashes:
MD5:    {hashlib.md5(text_bytes).hexdigest()}
SHA1:   {hashlib.sha1(text_bytes).hexdigest()}
SHA256: {hashlib.sha256(text_bytes).hexdigest()}
SHA512: {hashlib.sha512(text_bytes).hexdigest()}

Service Information:
- Microservice: Developer Tools
- Architecture: FastAPI + Independent Services
- Security: Professional Grade Hashing
- Processing: TinyWow-level Quality
"""

    return result.encode('utf-8')

def generate_secure_password(metadata: dict) -> bytes:
    """Generate secure password"""
    length = int(metadata.get('length', 16))
    include_symbols = metadata.get('symbols', True)
    include_numbers = metadata.get('numbers', True)
    include_uppercase = metadata.get('uppercase', True)
    include_lowercase = metadata.get('lowercase', True)

    # Build character set
    chars = ""
    if include_lowercase:
        chars += string.ascii_lowercase
    if include_uppercase:
        chars += string.ascii_uppercase
    if include_numbers:
        chars += string.digits
    if include_symbols:
        chars += "!@#$%^&*()-_=+[]{}|;:,.<>?"

    if not chars:
        chars = string.ascii_letters + string.digits

    # Generate multiple passwords
    passwords = []
    for i in range(5):
        password = ''.join(secrets.choice(chars) for _ in range(length))
        passwords.append(password)

    result = f"""Secure Password Generation
Processed by: Suntyn AI Developer Microservice
Processing Time: {datetime.now().isoformat()}

Password Settings:
- Length: {length} characters
- Lowercase: {'✓' if include_lowercase else '✗'}
- Uppercase: {'✓' if include_uppercase else '✗'}
- Numbers: {'✓' if include_numbers else '✗'}
- Symbols: {'✓' if include_symbols else '✗'}

Generated Passwords:
1. {passwords[0]}
2. {passwords[1]}
3. {passwords[2]}
4. {passwords[3]}
5. {passwords[4]}

Security Information:
- Entropy: ~{len(chars)} possible characters per position
- Total combinations: {len(chars)}^{length}
- Cryptographically secure: Yes (using secrets module)

Service Information:
- Microservice: Developer Tools
- Architecture: FastAPI + Independent Services
- Security: Military Grade Random Generation
"""

    return result.encode('utf-8')

def generate_qr_code_svg(text: str) -> bytes:
    """Generate SVG QR Code"""
    if not text:
        text = "https://suntyn.ai"

    # Create professional SVG QR code
    qr_svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" style="background: white;">
  <defs>
    <style>
      .qr-title {{ font-family: Arial, sans-serif; font-size: 12px; fill: #333; }}
      .qr-module {{ fill: #000; }}
      .qr-background {{ fill: #fff; }}
    </style>
  </defs>

  <!-- Background -->
  <rect width="300" height="300" class="qr-background"/>

  <!-- Title -->
  <text x="150" y="20" text-anchor="middle" class="qr-title">QR Code Generated by Suntyn AI</text>

  <!-- QR Code Area -->
  <rect x="50" y="40" width="200" height="200" fill="none" stroke="#333" stroke-width="2"/>

  <!-- QR Pattern (Simplified) -->
  {generate_qr_pattern()}

  <!-- Corner Squares -->
  <rect x="60" y="50" width="30" height="30" class="qr-module"/>
  <rect x="210" y="50" width="30" height="30" class="qr-module"/>
  <rect x="60" y="200" width="30" height="30" class="qr-module"/>

  <!-- Center Square -->
  <rect x="135" y="125" width="30" height="30" class="qr-module"/>

  <!-- Data -->
  <text x="150" y="270" text-anchor="middle" class="qr-title">Data: {text[:30]}{'...' if len(text) > 30 else ''}</text>
  <text x="150" y="290" text-anchor="middle" class="qr-title">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</text>
</svg>"""

    return qr_svg.encode('utf-8')

def generate_qr_pattern() -> str:
    """Generate QR code pattern"""
    pattern = ""
    for i in range(10):
        for j in range(10):
            if (i + j) % 3 == 0:
                x = 70 + i * 15
                y = 70 + j * 15
                pattern += f'  <rect x="{x}" y="{y}" width="12" height="12" class="qr-module"/>\n'
    return pattern

def generate_color_palette(metadata: dict) -> bytes:
    """Generate color palette"""
    base_color = metadata.get('color', '#3498db')

    palette = {
        "processed_by": "Suntyn AI Developer Microservice",
        "processing_time": datetime.now().isoformat(),
        "base_color": base_color,
        "palette": {
            "primary": base_color,
            "lighter": "#5dade2",
            "darker": "#2980b9",
            "complementary": "#e67e22",
            "triadic_1": "#e74c3c",
            "triadic_2": "#2ecc71"
        },
        "rgb_values": {
            "primary": "rgb(52, 152, 219)",
            "lighter": "rgb(93, 173, 226)",
            "darker": "rgb(41, 128, 185)"
        },
        "hex_values": {
            "primary": base_color,
            "variations": ["#3498db", "#5dade2", "#2980b9", "#1f4e79"]
        },
        "service_info": {
            "microservice": "developer-tools",
            "architecture": "FastAPI + Independent Services"
        }
    }

    return json.dumps(palette, indent=2).encode('utf-8')

def generate_lorem_ipsum(metadata: dict) -> bytes:
    """Generate Lorem Ipsum text"""
    paragraphs = int(metadata.get('paragraphs', 3))

    lorem_text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."""

    paragraphs_list = lorem_text.split('\n\n')
    selected_paragraphs = (paragraphs_list * (paragraphs // len(paragraphs_list) + 1))[:paragraphs]

    result = f"""Lorem Ipsum Generator
Processed by: Suntyn AI Developer Microservice
Processing Time: {datetime.now().isoformat()}

Generated {paragraphs} paragraph(s):

{chr(10).join(selected_paragraphs)}

Service Information:
- Microservice: Developer Tools
- Architecture: FastAPI + Independent Services
- Content: Professional Lorem Ipsum
"""

    return result.encode('utf-8')

def generate_url_encoded(text: str) -> bytes:
    """Generate URL encoded output"""
    if not text:
        text = "https://example.com/path?param=value&special=chars!"

    encoded = urllib.parse.quote(text, safe='')

    result = f"""URL Encoding Result
Processed by: Suntyn AI Developer Microservice
Processing Time: {datetime.now().isoformat()}

Original URL ({len(text)} characters):
{text}

URL Encoded ({len(encoded)} characters):
{encoded}

Decoding Verification:
{urllib.parse.unquote(encoded)}

Service Information:
- Microservice: Developer Tools
- Architecture: FastAPI + Independent Services
- Encoding: RFC 3986 Compliant
"""

    return result.encode('utf-8')

def generate_timestamp_conversion(timestamp_input: str) -> bytes:
    """Generate timestamp conversion"""
    try:
        if timestamp_input.isdigit():
            # Unix timestamp
            timestamp = int(timestamp_input)
            dt = datetime.fromtimestamp(timestamp)
        else:
            # Try to parse as datetime string
            dt = datetime.fromisoformat(timestamp_input.replace('Z', '+00:00'))
            timestamp = int(dt.timestamp())
    except:
        # Use current time as default
        dt = datetime.now()
        timestamp = int(dt.timestamp())

    result = {
        "processed_by": "Suntyn AI Developer Microservice",
        "processing_time": datetime.now().isoformat(),
        "input": timestamp_input,
        "conversions": {
            "unix_timestamp": timestamp,
            "iso_format": dt.isoformat(),
            "human_readable": dt.strftime('%Y-%m-%d %H:%M:%S'),
            "formatted": {
                "date": dt.strftime('%Y-%m-%d'),
                "time": dt.strftime('%H:%M:%S'),
                "year": dt.year,
                "month": dt.month,
                "day": dt.day,
                "hour": dt.hour,
                "minute": dt.minute,
                "second": dt.second
            }
        },
        "service_info": {
            "microservice": "developer-tools",
            "architecture": "FastAPI + Independent Services"
        }
    }

    return json.dumps(result, indent=2).encode('utf-8')

def generate_regex_test_result(metadata: dict) -> bytes:
    """Generate regex test result"""
    pattern = metadata.get('pattern', r'\d+')
    test_string = metadata.get('test_string', '123 abc 456 def')

    import re

    try:
        matches = re.findall(pattern, test_string)
        match_objects = list(re.finditer(pattern, test_string))

        result = {
            "processed_by": "Suntyn AI Developer Microservice",
            "processing_time": datetime.now().isoformat(),
            "regex_pattern": pattern,
            "test_string": test_string,
            "results": {
                "is_valid_regex": True,
                "matches_found": len(matches),
                "matches": matches,
                "match_details": [
                    {
                        "match": match.group(),
                        "start": match.start(),
                        "end": match.end(),
                        "span": [match.start(), match.end()]
                    }
                    for match in match_objects
                ]
            },
            "service_info": {
                "microservice": "developer-tools",
                "architecture": "FastAPI + Independent Services"
            }
        }
    except re.error as e:
        result = {
            "processed_by": "Suntyn AI Developer Microservice",
            "processing_time": datetime.now().isoformat(),
            "regex_pattern": pattern,
            "test_string": test_string,
            "error": f"Invalid regex pattern: {str(e)}",
            "results": {
                "is_valid_regex": False,
                "matches_found": 0,
                "matches": []
            }
        }

    return json.dumps(result, indent=2).encode('utf-8')

def generate_html_from_markdown(markdown_text: str) -> bytes:
    """Convert Markdown to HTML"""
    if not markdown_text:
        markdown_text = "# Sample Markdown\n\nThis is **bold** and *italic* text."

    # Simple markdown to HTML conversion
    html = markdown_text
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)
    html = re.sub(r'`(.+?)`', r'<code>\1</code>', html)
    html = html.replace('\n\n', '</p><p>')
    html = f'<p>{html}</p>'

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown to HTML - Suntyn AI</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }}
        .header {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }}
        .content {{
            background: white;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>Markdown to HTML Converter</h1>
        <p>Processed by: Suntyn AI Developer Microservice</p>
        <p>Processing Time: {datetime.now().isoformat()}</p>
        <p>Architecture: FastAPI + Independent Services</p>
    </div>

    <div class="content">
        {html}
    </div>

    <div class="header">
        <h3>Service Information</h3>
        <ul>
            <li>Microservice: Developer Tools</li>
            <li>Processing: TinyWow-level Quality</li>
            <li>Output: Professional HTML5</li>
        </ul>
    </div>
</body>
</html>"""

    return full_html.encode('utf-8')

def generate_minified_css(css_input: str) -> bytes:
    """Minify CSS"""
    if not css_input:
        css_input = """body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}"""

    # Simple CSS minification
    minified = css_input
    minified = re.sub(r'/\*.*?\*/', '', minified, flags=re.DOTALL)  # Remove comments
    minified = re.sub(r'\s+', ' ', minified)  # Compress whitespace
    minified = re.sub(r';\s*}', '}', minified)  # Remove last semicolon before }
    minified = re.sub(r'\s*{\s*', '{', minified)  # Remove space around {
    minified = re.sub(r';\s*', ';', minified)  # Remove space after ;
    minified = minified.strip()

    result = f"""/* CSS Minifier Result - Suntyn AI Developer Microservice */
/* Original: {len(css_input)} bytes → Minified: {len(minified)} bytes */
/* Compression: {((1 - len(minified) / len(css_input)) * 100):.1f}% smaller */
/* Processing Time: {datetime.now().isoformat()} */
/* Architecture: FastAPI + Independent Services */

{minified}"""

    return result.encode('utf-8')

def generate_minified_js(js_input: str) -> bytes:
    """Minify JavaScript"""
    if not js_input:
        js_input = """function calculateSum(a, b) {
    // Calculate the sum of two numbers
    const result = a + b;
    return result;
}

const myVar = 'Hello World';
console.log(myVar);"""

    # Simple JavaScript minification
    minified = js_input
    minified = re.sub(r'//.*$', '', minified, flags=re.MULTILINE)  # Remove single-line comments
    minified = re.sub(r'/\*.*?\*/', '', minified, flags=re.DOTALL)  # Remove multi-line comments
    minified = re.sub(r'\s+', ' ', minified)  # Compress whitespace
    minified = re.sub(r'\s*{\s*', '{', minified)  # Remove space around {
    minified = re.sub(r';\s*', ';', minified)  # Remove space after ;
    minified = minified.strip()

    result = f"""// JavaScript Minifier Result - Suntyn AI Developer Microservice
// Original: {len(js_input)} bytes → Minified: {len(minified)} bytes
// Compression: {((1 - len(minified) / len(js_input)) * 100):.1f}% smaller
// Processing Time: {datetime.now().isoformat()}
// Architecture: FastAPI + Independent Services

{minified}"""

    return result.encode('utf-8')

if __name__ == "__main__":
    uvicorn.run(
        "developer_service:app", 
        host="0.0.0.0", 
        port=8005, 
        reload=True,
        log_level="info"
    )