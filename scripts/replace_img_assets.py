import os
import re

def replace_asset_img_line(content):
    # Define the pattern to match the specified line
    pattern = r'<div style="width:100%;margin:auto">{% asset_img (.+?) %}</div>'
    
    # Replace the matched line with the new format
    new_content = re.sub(pattern, r'![](/static/images/Vivotek摄像头固件漏洞挖掘-AFL-FUZZ实战/\1)', content)
    
    return new_content

def process_files_in_directory(filepath):
  with open(filepath, 'r', encoding='utf-8') as file:
      content = file.read()

  new_content = replace_asset_img_line(content)

  with open(filepath, 'w', encoding='utf-8') as file:
      file.write(new_content)

if __name__ == '__main__':
    filepath = '/home/jackfromeast/Desktop/MyBlog/data/blog/Vivotek摄像头固件漏洞挖掘-AFL-FUZZ实战.mdx'  # Replace with the actual path to your blog files
    process_files_in_directory(filepath)
