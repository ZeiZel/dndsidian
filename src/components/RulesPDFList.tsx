import useBaseUrl from "@docusaurus/useBaseUrl";

export const RulesPdfList = () => {
    const RULES_PDF = [
        {
            caption: '📖 Руководство мастера (PDF)',
            href: useBaseUrl('/dndsidian/assets/ru/5e-Dungeon-Masters-Guide-Rukovodstvo-Mastera-RUS.pdf')
        },
        {
            caption: '📖 Книга игрока (PDF)',
            href: useBaseUrl('/dndsidian/assets/ru/5e-Players-Handbook-Kniga-igroka-RUS.pdf'),
        },
        {
            caption: '📖 Бестиарий (PDF)',
            href: useBaseUrl('/dndsidian/assets/ru/Monster-Manual-5e-RUS.pdf')
        },
        {
            caption: '📖 Быстрые правила (PDF)',
            href: useBaseUrl('/dndsidian/assets/ru/5e-starter-set-basic-rules-RUS.pdf')
        },
    ]

    return (
        <div className="scroll-container">
            <ul className="dnd-pdf-list">
                {RULES_PDF.map(({ caption, href }, index) => (
                    <li key={index} className="pdf-scroll-item">
                        <a
                            href={useBaseUrl(href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dnd-button pdf-link"
                        >
                            {caption}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}