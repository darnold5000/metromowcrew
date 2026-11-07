import { describe, expect, it } from "vitest";
import { parseJobberEmbedSrc } from "./jobber";

describe("parseJobberEmbedSrc", () => {
  it("accepts a Client Hub request URL", () => {
    const src =
      "https://clienthub.getjobber.com/client_hubs/abc/public/work_request/new";
    expect(parseJobberEmbedSrc(src)).toBe(src);
  });

  it("extracts iframe src from Jobber copy-code HTML", () => {
    const html = `<iframe src="https://clienthub.getjobber.com/client_hubs/abc/public/work_request/new?source=embed" style="width:100%;border:none;min-height:700px"></iframe>`;
    expect(parseJobberEmbedSrc(html)).toBe(
      "https://clienthub.getjobber.com/client_hubs/abc/public/work_request/new?source=embed",
    );
  });

  it("rejects non-Jobber hosts", () => {
    expect(parseJobberEmbedSrc("https://example.com/form")).toBeNull();
    expect(parseJobberEmbedSrc("<iframe src='https://evil.example/x'></iframe>")).toBeNull();
  });
});
