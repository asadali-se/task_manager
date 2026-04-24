import os
import sys
from pathlib import Path

# Add the server directory to Python path
server_dir = Path(__file__).parent.parent
sys.path.insert(0, str(server_dir))

# Change to server directory so Django can find settings
os.chdir(str(server_dir))

# Django setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

import django
django.setup()

# Import after Django setup
from django.core.handlers.wsgi import WSGIHandler
from django.core.wsgi import get_wsgi_application

# Create WSGI application
application = get_wsgi_application()

# Standard Vercel Python handler
def handler(event, context):
    """
    Vercel serverless function handler that bridges Vercel's HTTP events to Django's WSGI application.
    """
    from django.http import HttpRequest
    from django.test import RequestFactory
    import json

    # Create Django request from Vercel event
    factory = RequestFactory()

    # Extract event data
    path = event.get('path', '/')
    method = event.get('method', 'GET')
    headers = event.get('headers', {})
    query_string = event.get('query', '')
    body = event.get('body', '')

    # Build query parameters
    query_dict = {}
    if query_string:
        from urllib.parse import parse_qs
        parsed_query = parse_qs(query_string)
        for key, values in parsed_query.items():
            query_dict[key] = values[0] if len(values) == 1 else values

    # Build headers for Django request
    django_headers = {}
    for key, value in headers.items():
        key_upper = key.upper().replace('-', '_')
        django_headers[f'HTTP_{key_upper}'] = value

    # Create appropriate request based on method
    if method == 'GET':
        request = factory.get(path, data=query_dict, **django_headers)
    elif method == 'POST':
        request = factory.post(path, data=json.loads(body) if body else {},
                              content_type='application/json', **django_headers)
    elif method == 'PUT':
        request = factory.put(path, data=json.loads(body) if body else {},
                             content_type='application/json', **django_headers)
    elif method == 'PATCH':
        request = factory.patch(path, data=json.loads(body) if body else {},
                               content_type='application/json', **django_headers)
    elif method == 'DELETE':
        request = factory.delete(path, **django_headers)
    else:
        request = factory.get(path, **django_headers)

    # Get response from Django application
    from django.core.handlers.wsgi import WSGIHandler
    wsgi_handler = WSGIHandler()

    # Process request through Django
    response = wsgi_handler(request)

    # Convert Django response to Vercel response
    status_code = response.status_code

    # Convert headers
    response_headers = {}
    for header, value in response.items():
        if header in ['Content-Type', 'Location', 'Set-Cookie']:
            response_headers[header] = value

    # Get response body
    if hasattr(response, 'content'):
        body_content = response.content.decode('utf-8')
    else:
        body_content = ''

    return {
        'statusCode': status_code,
        'headers': response_headers,
        'body': body_content
    }
