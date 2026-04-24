import os
import sys
from pathlib import Path

# Setup Django
server_dir = Path(__file__).parent.parent
sys.path.insert(0, str(server_dir))
os.chdir(str(server_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

import django
django.setup()

# Django app
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Lambda handler
def lambda_handler(event, context):
    """AWS Lambda handler for Vercel"""
    from django.test import RequestFactory
    import json

    # Parse event
    path = event.get('path', '/')
    method = event.get('httpMethod', 'GET')
    headers = dict(event.get('headers', {}))
    query_params = event.get('queryStringParameters', {}) or {}
    body = event.get('body', '')

    # Create Django request
    factory = RequestFactory()

    # Format headers for Django
    django_headers = {}
    for key, value in headers.items():
        key_upper = key.upper().replace('-', '_')
        django_headers[f'HTTP_{key_upper}'] = value

    # Create appropriate request
    if method == 'GET':
        request = factory.get(path, data=query_params, **django_headers)
    elif method == 'POST':
        body_data = json.loads(body) if body else {}
        request = factory.post(path, data=body_data, content_type='application/json', **django_headers)
    elif method == 'PATCH':
        body_data = json.loads(body) if body else {}
        request = factory.patch(path, data=body_data, content_type='application/json', **django_headers)
    elif method == 'DELETE':
        request = factory.delete(path, **django_headers)
    else:
        request = factory.get(path, **django_headers)

    # Get response from Django
    response = application(request)

    # Return Lambda response format
    return {
        'statusCode': response.status_code,
        'headers': dict(response.items()),
        'body': response.content.decode('utf-8')
    }

# Vercel handler (alias)
handler = lambda_handler
