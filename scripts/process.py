import os
import re
from datetime import datetime

def process_blog_content(content):
    # Process header
    header, body = content.split('---\n', 1)[1].split('\n---\n', 1)
    header_lines = header.split('\n')
    new_header_lines = []
    tags_list = []

    for line in header_lines:
        if line.startswith('categories:') or line.startswith('urlname:') or line.startswith('abbrlink:') or line.startswith('mathjax:'):
            continue
        if line.startswith('title:'):
            # Wrap the value in quotes
            title_value = line.split(': ', 1)[1].strip()
            line = f'title: "{title_value}"'
        elif line.startswith('tags:'):
            continue  # We will handle tags separately
        elif line.startswith('  -'):
            # Collect tags
            tags_list.append(line.strip()[2:])
            continue
        elif line.startswith('date:'):
            date_str = line.split(' ', 1)[1]
            date_obj = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
            line = f'date: "{date_obj.strftime("%Y-%m-%d")}"'
        new_header_lines.append(line)

    # Add formatted tags
    if tags_list:
        new_header_lines.append(f'tags: {tags_list}')

    # Extract summary from content before <!--more--> tag
    summary_match = re.search(r'(.*?)<!--more-->', body, re.DOTALL)
    summary = summary_match.group(1).replace('\n', ' ').strip() if summary_match else body.split('\n\n', 1)[0].replace('\n', ' ').strip()
    new_header_lines.append('draft: false')
    new_header_lines.append(f'summary: "{summary}"')

    new_header = '---\n' + '\n'.join(new_header_lines) + '\n---\n'

    # Remove <!--more--> tag
    body = body.replace('<!--more-->', '')

    # Add prefix to image paths
    body = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'![\1](/static/images/\2)', body)

    return new_header + body

def process_files_in_directory(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.md'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()

            new_content = process_blog_content(content)
            new_filepath = filepath.replace('.md', '.mdx')
            with open(new_filepath, 'w', encoding='utf-8') as file:
                file.write(new_content)
            
            os.remove(filepath)

if __name__ == '__main__':
  directory = '/home/jackfromeast/Desktop/MyBlog/data/blog'
  process_files_in_directory(directory)
