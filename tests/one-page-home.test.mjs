import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

function readProjectFile(filePath) {
  return readFileSync(path.join(root, filePath), "utf8");
}

test("home page uses the requested video hero direction", () => {
  const page = readProjectFile("src/app/page.tsx");

  assert.match(page, /download\.mp4/);
  assert.match(page, /Imagine\. Design\. Build\./);
  assert.match(page, /Muhammad Hasbiriza/);
  assert.match(page, /Ecommerce Engineer/);
  assert.match(page, /id="home"/);
  assert.match(page, /id="profile"/);
  assert.match(page, /id="contact"/);
});

test("navigation stays on the single page with smooth-scroll anchors", () => {
  const header = readProjectFile("src/components/layout/header.tsx");
  const footer = readProjectFile("src/components/layout/footer.tsx");
  const anchors = ["/#home", "/#profile", "/#work", "/#process", "/#contact"];

  for (const anchor of anchors) {
    assert.ok(header.includes(anchor), `header should include ${anchor}`);
  }

  for (const anchor of anchors.slice(1)) {
    assert.ok(footer.includes(anchor), `footer should include ${anchor}`);
  }

  assert.ok(!header.includes("/#services"), "header should not link to removed services section");
  assert.ok(!footer.includes("/#services"), "footer should not link to removed services section");
});

test("home logos use two animated rows with fading edges", () => {
  const page = readProjectFile("src/app/page.tsx");
  const styles = readProjectFile("src/app/page.module.css");

  assert.match(page, /logoRows/);
  assert.match(page, /logoRowReverse/);
  assert.match(styles, /logoDriftLeft/);
  assert.match(styles, /logoDriftRight/);
  assert.match(styles, /mask-image: linear-gradient/);
});

test("profile appears before the technology stack on the homepage", () => {
  const page = readProjectFile("src/app/page.tsx");
  const profileIndex = page.indexOf('id="profile"');
  const stackIndex = page.indexOf("<LogoCarousel3D");

  assert.notEqual(profileIndex, -1, "expected profile section on homepage");
  assert.notEqual(stackIndex, -1, "expected technology stack section on homepage");
  assert.ok(
    profileIndex < stackIndex,
    "profile section should render before the technology stack",
  );
});

test("technology stack uses tools logo assets instead of brand logos", () => {
  const page = readProjectFile("src/app/page.tsx");
  const toolLogos = readProjectFile("src/data/tool-logos.ts");
  const stackBlock = page.match(/<LogoCarousel3D[\s\S]*?\/>/);

  assert.ok(stackBlock, "expected LogoCarousel3D usage");
  assert.match(page, /toolLogos/);
  assert.match(toolLogos, /assets\/raw\/tools_logo\/Shopify_logo\.svg\.png/);
  assert.match(toolLogos, /Shopify logo/);
  assert.match(stackBlock[0], /toolLogos/);
  assert.doesNotMatch(stackBlock[0], /\/logo\/\$\{fileName\}/);
  assert.ok(
    existsSync(path.join(root, "assets", "raw", "tools_logo", "Shopify_logo.svg.png")),
    "raw tools logo folder should include Shopify_logo.svg.png",
  );
});

test("video and logo assets are available from the public folder", () => {
  assert.ok(existsSync(path.join(root, "public/download.mp4")));

  const logoDirectory = path.join(root, "public/logo");
  const logoFiles = readdirSync(logoDirectory).filter((fileName) =>
    /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(fileName),
  );

  assert.ok(logoFiles.length > 0, "expected at least one public logo asset");
});

test("root layout tolerates extension-injected body attributes", () => {
  const layout = readProjectFile("src/app/layout.tsx");

  assert.match(layout, /<body[^>]*suppressHydrationWarning/);
});

test("repository keeps canonical asset and database folders", () => {
  const env = readProjectFile(".env");

  assert.ok(!existsSync(path.join(root, "ProjectImage")), "root ProjectImage folder should be removed");
  assert.ok(!existsSync(path.join(root, "download.mp4")), "root download.mp4 should be removed");
  assert.ok(!existsSync(path.join(root, "logo")), "root logo folder should be moved out of the root");
  assert.ok(!existsSync(path.join(root, "tools_logo")), "root tools_logo folder should be moved out of the root");
  assert.ok(!existsSync(path.join(root, "dev.db")), "root dev.db should be moved under prisma");
  assert.ok(existsSync(path.join(root, "public/ProjectImage")));
  assert.ok(existsSync(path.join(root, "public/download.mp4")));
  assert.ok(existsSync(path.join(root, "public/logo")));
  assert.ok(existsSync(path.join(root, "public/tools_logo")));
  assert.ok(existsSync(path.join(root, "assets/raw/logo")));
  assert.ok(existsSync(path.join(root, "assets/raw/tools_logo")));
  assert.ok(existsSync(path.join(root, "prisma/dev.db")));
  assert.match(env, /DATABASE_URL="file:\.\/prisma\/dev\.db"/);
});

test("project image cards constrain fill images inside the card", () => {
  const page = readProjectFile("src/app/page.tsx");
  const grid = readProjectFile("src/components/ui/project-work-grid.tsx");
  const data = readProjectFile("src/data/work-projects.ts");
  const styles = readProjectFile("src/components/ui/project-work-grid.module.css");
  const projectImages = [...data.matchAll(/projectImagePath\("([^"]+)"\)/g)].map(
    (match) => match[1],
  );

  assert.ok(!page.includes('id="services"'), "services section should be removed");
  assert.match(page, /shopifyProjects/);
  assert.match(grid, /className={styles\.projectImage}/);
  assert.match(grid, /className={styles\.projectLogo}/);
  assert.match(styles, /\.projectLogoPanel\s*{[^}]*position: relative/s);
  assert.match(styles, /\.projectImage\s*{[^}]*object-fit: cover/s);
  assert.match(styles, /\.projectImage\s*{[^}]*object-position: center/s);
  assert.ok(projectImages.length > 0, "expected at least one referenced project image");

  for (const imageName of [
    "jdmlures.jpg",
    "annalee.webp",
    "abercrobmie.webp",
    "hollister.avif",
    "huggooling.png",
  ]) {
    assert.ok(
      projectImages.includes(imageName),
      `home page should use restored project image ${imageName}`,
    );
  }

  for (const imageName of projectImages) {
    assert.ok(
      data.includes(imageName),
      `project data should reference image ${imageName}`,
    );
    assert.ok(
      existsSync(path.join(root, "public", "ProjectImage", imageName)),
      `public ProjectImage should include ${imageName}`,
    );
  }
});

test("shopify project list renders each project only once", () => {
  const data = readProjectFile("src/data/work-projects.ts");
  const projectBlock = data.match(/export const shopifyProjects: ShopifyProject\[] = \[([\s\S]*?)\n\];/);

  assert.ok(projectBlock, "expected shopifyProjects list to exist");

  const titles = [...projectBlock[1].matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);

  assert.deepEqual(duplicates, [], `duplicate projects found: ${duplicates.join(", ")}`);
  assert.equal(titles.filter((title) => title === "Elmadina Abaya").length, 1);
  assert.equal(titles.filter((title) => title === "Bali Our Projects").length, 1);
  assert.equal(titles.filter((title) => /friend of sally/i.test(title)).length, 1);
});

test("project cards open in a new tab", () => {
  const grid = readProjectFile("src/components/ui/project-work-grid.tsx");
  const projectAnchor = grid.match(/<a\s+className={styles\.projectCard}[\s\S]*?>/);

  assert.ok(projectAnchor, "expected project card anchor to exist");
  assert.match(projectAnchor[0], /target="_blank"/);
  assert.match(projectAnchor[0], /rel="noreferrer"/);
});

test("project categories stay compact and match the intended grouping", () => {
  const data = readProjectFile("src/data/work-projects.ts");
  const projectBlock = data.match(/export const projectCategories = \[([\s\S]*?)\n\] as const;/);
  const projectListBlock = data.match(/export const shopifyProjects: ShopifyProject\[] = \[([\s\S]*?)\n\];/);

  assert.ok(projectBlock, "expected projectCategories list to exist");
  assert.ok(projectListBlock, "expected shopifyProjects list to exist");

  const categories = [...projectBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  const titles = [...projectListBlock[1].matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
  const assignedCategories = [
    ...projectListBlock[1].matchAll(/category: "([^"]+)"/g),
  ].map((match) => match[1]);

  assert.deepEqual(categories, [
    "All Works",
    "Fashion & Lifestyle",
    "Beauty & Wellness",
    "Food & Beverage",
    "Sports & Outdoor",
    "Home Tech & Specialty",
  ]);
  assert.equal(titles.length, assignedCategories.length);
  assert.equal(new Set(assignedCategories).size, 5);
  assert.ok(assignedCategories.every((category) => categories.includes(category)));
});

test("project categories use a polished mobile dropdown", () => {
  const grid = readProjectFile("src/components/ui/project-work-grid.tsx");
  const styles = readProjectFile("src/components/ui/project-work-grid.module.css");

  assert.match(grid, /activeCategory === category \? styles\.activeCategory : ""/);
  assert.match(grid, /<select[\s\S]*className={styles\.categorySelect}/);
  assert.match(grid, /value={activeCategory}/);
  assert.match(grid, /onChange={\(event\) => setActiveCategory\(event\.target\.value\)}/);
  assert.match(grid, /<option value={category} key={category}>/);
  assert.match(styles, /\.categorySelectWrap\s*{/);
  assert.match(styles, /\.categorySelect\s*{/);
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*\.workCategories\s*{[\s\S]*display: none/s);
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*\.categorySelectWrap\s*{[\s\S]*display: block/s);
});

test("contact section exposes direct icon links", () => {
  const page = readProjectFile("src/app/page.tsx");
  const styles = readProjectFile("src/app/page.module.css");

  assert.match(page, /EmailLogo/);
  assert.match(page, /WhatsAppLogo/);
  assert.match(page, /LinkedInLogo/);
  assert.match(page, /MediumLogo/);
  assert.match(page, /mailto:hasbiriza@gmail\.com/);
  assert.match(page, /https:\/\/wa\.me\/628812530224/);
  assert.match(page, /https:\/\/www\.linkedin\.com\/in\/muhammadhasbiriza/);
  assert.match(page, /https:\/\/medium\.com\/@hasbiriza/);
  assert.match(page, /aria-label={contact\.label}/);
  assert.doesNotMatch(page, /contactText/);
  assert.match(styles, /\.contactIcon/);
  assert.match(styles, /\.contactIcon svg/);
  assert.match(styles, /\.contactGrid/);
  assert.doesNotMatch(styles, /\.contactText/);
});

test("global scroll progress line is not rendered", () => {
  const experienceLayer = readProjectFile("src/components/ui/experience-layer.tsx");

  assert.doesNotMatch(experienceLayer, /useScroll/);
  assert.doesNotMatch(experienceLayer, /useSpring/);
  assert.doesNotMatch(experienceLayer, /scaleX: progressScale/);
  assert.doesNotMatch(experienceLayer, /height: 2/);
});

test("profile section uses fully English copy", () => {
  const page = readProjectFile("src/app/page.tsx");

  assert.match(page, /End To End O2O With Shopify/);
  assert.match(page, /I build fast, elegant, conversion-focused Shopify experiences\./);
  assert.match(page, /Apps Development/);
  assert.doesNotMatch(page, /Membangun experience Shopify/);
});

test("hero text reveals smoothly over the opening video", () => {
  const styles = readProjectFile("src/app/page.module.css");

  assert.match(styles, /@keyframes heroTextReveal/);
  assert.match(styles, /\.heroKicker\s*{[^}]*animation: heroTextReveal/s);
  assert.match(styles, /\.heroTitle\s*{[^}]*animation: heroTextReveal/s);
  assert.match(styles, /\.heroLead\s*{[^}]*animation: heroTextReveal/s);
  assert.match(styles, /cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
});

test("development process animation settles before the contact handoff", () => {
  const timeline = readProjectFile("src/components/ui/process-timeline.tsx");
  const styles = readProjectFile("src/components/ui/process-timeline.module.css");

  assert.match(timeline, /timelineProgress/);
  assert.match(timeline, /\[0,\s*0\.92\],\s*\[0,\s*1\]/);
  assert.match(styles, /\.section\s*{[^}]*isolation: isolate/s);
  assert.match(styles, /\.stickyStage\s*{[^}]*overflow: hidden/s);
  assert.match(styles, /\.stickyStage\s*{[^}]*transform: translateZ\(0\)/s);
  assert.match(styles, /\.stickyStage\s*{[^}]*backface-visibility: hidden/s);
});

test("development process shows all content on mobile without clipping", () => {
  const styles = readProjectFile("src/components/ui/process-timeline.module.css");

  assert.match(styles, /@media \(max-width: 840px\)[\s\S]*\.stickyStage\s*{[\s\S]*height: auto/s);
  assert.match(styles, /@media \(max-width: 840px\)[\s\S]*\.stickyStage\s*{[\s\S]*overflow: visible/s);
  assert.match(styles, /@media \(max-width: 840px\)[\s\S]*\.stickyStage\s*{[\s\S]*transform: none/s);
  assert.match(styles, /@media \(max-width: 840px\)[\s\S]*\.stickyStage\s*{[\s\S]*will-change: auto/s);
});
