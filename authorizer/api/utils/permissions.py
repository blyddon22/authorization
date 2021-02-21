import boto3


def validate_permissions(permissions, username):
    client = boto3.client('dynamodb')

    expression = ''
    count = 2
    attributes = {
        ':v1': {
            'S': username
        }
    }
    for perm in permissions:
        if not expression == '':
            expression += ' and '
        attributes.update({
            ':v{}'.format(count): {
                'S': perm
            }
        })
        expression += 'contains(perms, {})'.format(':v{}'.format(count))
        count += 1

    response = client.query(
        TableName='user_permissions',
        ExpressionAttributeValues=attributes,
        KeyConditionExpression='username = :v1',
        FilterExpression=expression
    )

    return response['Count'] > 0
