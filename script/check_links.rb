#!/usr/bin/env ruby
# frozen_string_literal: true

# Fails the build on internal links that point at nothing, and on any
# subresource loaded over plain http or a protocol-relative URL. A dead
# Twitter embed slipped through for years; this is how it stays gone.

require "set"

SITE = File.expand_path("../_site", __dir__)
abort "No _site/ — run `jekyll build` first." unless Dir.exist?(SITE)

files = Dir.glob("#{SITE}/**/*", File::FNM_DOTMATCH)
          .select { |p| File.file?(p) }
          .map { |p| "/" + p.delete_prefix("#{SITE}/") }
          .to_set

def resolvable?(url, files)
  files.include?(url) || (url.end_with?("/") && files.include?("#{url}index.html"))
end

broken = []
insecure = []

Dir.glob("#{SITE}/**/*.html").each do |path|
  page = "/" + path.delete_prefix("#{SITE}/")
  html = File.read(path)

  html.scan(/(?:href|src)="([^"]+)"/).flatten.each do |raw|
    if raw.start_with?("//") || raw.start_with?("http://")
      # Prose links in the archived 2015 posts are text, not loaded resources.
      insecure << [page, raw] if raw.start_with?("//")
      next
    end
    next if raw.start_with?("https://", "mailto:", "#", "data:")

    url = raw.split("#").first.to_s.split("?").first.to_s
    next if url.empty?

    url = "/#{url}" unless url.start_with?("/")
    broken << [page, raw] unless resolvable?(url, files)
  end
end

broken.uniq.each { |page, url| warn "broken link  #{page} -> #{url}" }
insecure.uniq.each { |page, url| warn "insecure     #{page} -> #{url}" }

if broken.empty? && insecure.empty?
  puts "Links OK (#{Dir.glob("#{SITE}/**/*.html").size} pages checked)."
else
  abort "\n#{broken.uniq.size} broken, #{insecure.uniq.size} insecure."
end
