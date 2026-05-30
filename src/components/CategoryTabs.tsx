import { useTranslation } from 'react-i18next';
import { useConversion } from '../hooks/useConversion';
import { categories } from '../domain/registry';
export default function CategoryTabs() {
  const { t } = useTranslation();
  const { category, setCategory } = useConversion();
  return (
    <nav className="scroll-fade flex overflow-x-auto snap-x gap-1 px-2 py-2 border-b border-slate-700 bg-slate-800">
      {Object.values(categories).map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`
            snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
            transition-colors duration-150 flex-shrink-0
            ${category === cat.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
            }
          `}
        >
          <span>{cat.icon}</span>
          <span>{t(`categories.${cat.id}`)}</span>
        </button>
      ))}
    </nav>
  );
}