export function updateVisitorCenterNavLinks(centers = []) {
  const lists = document.querySelectorAll(".visitor-center-nav-links");
  if (!lists.length || !centers.length) return;

  const byName = new Map(
    centers
      .filter((center) => center?.name && center?.id)
      .map((center) => [center.name.trim().toLowerCase(), center.id])
  );

  lists.forEach((list) => {
    list.querySelectorAll("a").forEach((anchor) => {
      const key = anchor.textContent.trim().toLowerCase();
      const id = byName.get(key);
      if (id) {
        anchor.href = `visitor-center.html?id=${id}`;
      }
    });
  });
}
