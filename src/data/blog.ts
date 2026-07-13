import matter from 'gray-matter';
import type { BlogPost } from '../types/blog';

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const name = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
  return name;
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const { data, content } = matter(raw as string);
    posts.push({
      slug: slugFromPath(path),
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      cover: data.cover,
      description: data.description ?? '',
      body: content,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
