import React, { useEffect, useState, useCallback } from 'react';
import {
  Home,
  HeartHandshake,
  Sparkles,
  Utensils,
  Droplets,
  FlaskConical,
  BookOpen,
  Leaf,
  Package,
  ShoppingBag,
  Star,
  Compass,
  Newspaper,
  HelpCircle,
  MessageCircle,
  GraduationCap,
  Layers,
  Activity,
  ChevronDown,
  ChevronRight,
  Lock,
  Microscope,
} from 'lucide-react';
import { Language } from '../translations';
import { View } from '../types';
import {
  NAVIGATION_SECTIONS,
  NavGroupItem,
  NavIconKey,
  NavLeafItem,
  NavNode,
  getText,
  hasActiveDescendant,
  isNavItemActive,
} from '../data/navigationConfig';

interface NavigationMenuTreeProps {
  currentView: View;
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
  variant: 'sidebar' | 'mobile';
  onItemSelect?: () => void;
}

function renderIcon(iconKey: NavIconKey | undefined, className: string) {
  switch (iconKey) {
    case 'home':
      return <Home className={className} aria-hidden="true" />;
    case 'heart':
      return <HeartHandshake className={className} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'utensils':
      return <Utensils className={className} aria-hidden="true" />;
    case 'droplets':
      return <Droplets className={className} aria-hidden="true" />;
    case 'flask':
      return <FlaskConical className={className} aria-hidden="true" />;
    case 'book':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'leaf':
      return <Leaf className={className} aria-hidden="true" />;
    case 'package':
      return <Package className={className} aria-hidden="true" />;
    case 'bag':
      return <ShoppingBag className={className} aria-hidden="true" />;
    case 'star':
      return <Star className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'newspaper':
      return <Newspaper className={className} aria-hidden="true" />;
    case 'help':
      return <HelpCircle className={className} aria-hidden="true" />;
    case 'message':
      return <MessageCircle className={className} aria-hidden="true" />;
    case 'graduation':
      return <GraduationCap className={className} aria-hidden="true" />;
    case 'layers':
      return <Layers className={className} aria-hidden="true" />;
    case 'activity':
      return <Activity className={className} aria-hidden="true" />;
    case 'microscope':
      return <Microscope className={className} aria-hidden="true" />;
    default:
      return null;
  }
}

function collectDefaultOpenGroups(
  nodes: NavNode[],
  currentView: View,
  pathname: string,
  acc: Record<string, boolean>
) {
  for (const node of nodes) {
    if (node.kind === 'group') {
      const activeWithin = hasActiveDescendant(node, currentView, pathname);
      acc[node.id] = Boolean(node.defaultOpen || activeWithin);
      collectDefaultOpenGroups(node.children, currentView, pathname, acc);
    }
  }
}

function collectActiveGroupIds(
  nodes: NavNode[],
  currentView: View,
  pathname: string,
  acc: string[]
) {
  for (const node of nodes) {
    if (node.kind === 'group') {
      if (hasActiveDescendant(node, currentView, pathname)) {
        acc.push(node.id);
      }
      collectActiveGroupIds(node.children, currentView, pathname, acc);
    }
  }
}

export const NavigationMenuTree: React.FC<NavigationMenuTreeProps> = ({
  currentView,
  onNavigate,
  lang,
  variant,
  onItemSelect,
}) => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of NAVIGATION_SECTIONS) {
      collectDefaultOpenGroups(section.items, currentView, pathname, initial);
    }
    return initial;
  });

  // Auto-open ancestor groups when the active route changes
  useEffect(() => {
    const activeIds: string[] = [];
    for (const section of NAVIGATION_SECTIONS) {
      collectActiveGroupIds(section.items, currentView, pathname, activeIds);
    }
    if (activeIds.length > 0) {
      setOpenGroups((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const id of activeIds) {
          if (!next[id]) {
            next[id] = true;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }
  }, [currentView, pathname]);

  const toggleGroup = useCallback((groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  }, []);

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: View,
    param?: string,
    scrollTargetId?: string
  ) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onNavigate(view, param);
      onItemSelect?.();
      if (scrollTargetId) {
        setTimeout(() => {
          const el = document.getElementById(scrollTargetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  const isSidebar = variant === 'sidebar';

  const linkClass = (active: boolean, extraPaddingLeft = '') =>
    `flex items-center justify-between w-full ${
      isSidebar ? 'px-3 py-1.5 text-xs' : 'px-3 py-2 text-sm'
    } ${extraPaddingLeft} rounded-xl font-semibold transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F261E] ${
      active
        ? 'bg-white/15 text-white font-bold border border-white/25 shadow-xs'
        : 'text-white/85 hover:text-white hover:bg-white/10 border border-transparent'
    }`;

  const iconClass = (active: boolean) =>
    `${isSidebar ? 'w-3.5 h-3.5' : 'w-4 h-4'} shrink-0 transition-colors ${
      active ? 'text-[#E8772E]' : 'text-white/60 group-hover:text-white'
    }`;

  const renderLeaf = (item: NavLeafItem, depth: number) => {
    const active = isNavItemActive(item, currentView, pathname);
    const label = getText(item.label, lang);
    const title = item.title ? getText(item.title, lang) : undefined;
    const indentStyle =
      depth === 0 ? '' : depth === 1 ? 'pl-3' : depth === 2 ? 'pl-5' : 'pl-6';

    return (
      <a
        key={item.id}
        href={item.href}
        title={title}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => handleNavigate(e, item.view, item.param, item.scrollTargetId)}
        className={`${linkClass(active)} ${item.highlightGold ? 'hover:bg-[#F59E0B]/10' : ''}`}
      >
        <span className={`flex items-center gap-2 min-w-0 overflow-hidden text-left ${indentStyle}`}>
          {item.treePrefix ? (
            <span
              aria-hidden="true"
              className={`font-mono text-[10.5px] shrink-0 ${
                item.highlightGold ? 'text-[#F59E0B]' : 'text-[#8b949e]'
              }`}
            >
              {item.treePrefix}
            </span>
          ) : (
            item.icon && renderIcon(item.icon, iconClass(active))
          )}
          <span
            className={`truncate ${
              item.highlightGold
                ? 'text-[#F59E0B] font-black'
                : item.isSubtle
                ? 'text-white/65 italic'
                : depth >= 2
                ? 'text-[11px]'
                : ''
            }`}
          >
            {label}
          </span>
        </span>

        {(item.badge || item.locked) && (
          <span className="flex items-center gap-1 shrink-0 ml-1.5">
            {item.badge && item.badgeTone === 'free' && (
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {getText(item.badge, lang)}
              </span>
            )}
            {item.badge && item.badgeTone === 'new' && (
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#E8772E]/20 text-[#F59E0B] font-bold border border-[#E8772E]/30">
                {getText(item.badge, lang)}
              </span>
            )}
            {item.badge && item.badgeTone === 'abo' && (
              <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#C8AB8A]/20 text-[#C8AB8A] font-bold">
                {getText(item.badge, lang)}
              </span>
            )}
            {item.locked && (
              <Lock
                aria-hidden="true"
                className={`w-3 h-3 shrink-0 ${
                  item.highlightGold ? 'text-[#F59E0B]' : 'text-[#c9a84c]/80'
                }`}
              />
            )}
          </span>
        )}
      </a>
    );
  };

  const renderGroup = (group: NavGroupItem, depth: number): React.ReactNode => {
    const isOpen = Boolean(openGroups[group.id]);
    const panelId = `${variant}-submenu-${group.id}`;
    const label = getText(group.label, lang);
    const activeSelf = isNavItemActive(group, currentView, pathname);
    const activeWithin = hasActiveDescendant(group, currentView, pathname);
    const isAcademyRoot = group.id === 'group-academie';

    const toggleActionLabel =
      lang === 'fr'
        ? `${isOpen ? 'Replier' : 'Déplier'} ${label}`
        : lang === 'de'
        ? `${label} ${isOpen ? 'einklappen' : 'ausklappen'}`
        : `${isOpen ? 'Collapse' : 'Expand'} ${label}`;

    // Special styling for top-level Académie card (distinct sibling link + toggle button)
    if (isAcademyRoot && group.href && group.view) {
      return (
        <div key={group.id} className="pt-1">
          <div className="flex items-center justify-between gap-1 mb-1">
            <a
              href={group.href}
              title={group.title ? getText(group.title, lang) : undefined}
              aria-current={activeSelf ? 'page' : undefined}
              onClick={(e) => {
                setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
                handleNavigate(e, group.view!, group.param);
              }}
              className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E] ${
                activeSelf || activeWithin
                  ? 'bg-[#E8772E]/20 text-[#E8772E] border-[#E8772E]/50 shadow-xs'
                  : 'bg-[#E8772E]/10 hover:bg-[#E8772E]/15 text-[#E8772E] border-[#E8772E]/25 hover:border-[#E8772E]/40'
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <GraduationCap className="w-4 h-4 text-[#E8772E] shrink-0" aria-hidden="true" />
                <span className="font-bold text-[#E8772E] tracking-wide truncate">{label}</span>
              </span>
              <span className="text-[8px] uppercase px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#0F261E] font-black tracking-wider shadow-xs shrink-0">
                {lang === 'fr' ? 'Pédagogie' : lang === 'de' ? 'Pädagogik' : 'Pedagogy'}
              </span>
            </a>

            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={toggleActionLabel}
              title={toggleActionLabel}
              className="p-2 rounded-xl text-[#E8772E] hover:bg-[#E8772E]/15 border border-[#E8772E]/25 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-[#E8772E]" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#E8772E]" aria-hidden="true" />
              )}
            </button>
          </div>

          {isOpen && (
            <div
              id={panelId}
              className="space-y-0.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {group.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Group with its own destination link + distinct sibling toggle button
    if (group.href && group.view) {
      const indentPad = depth === 0 ? '' : depth === 1 ? 'pl-3' : 'pl-4';
      return (
        <div key={group.id} className="space-y-0.5">
          <div className="flex items-center gap-1">
            <a
              href={group.href}
              aria-current={activeSelf ? 'page' : undefined}
              onClick={(e) => handleNavigate(e, group.view!, group.param)}
              className={`flex-1 min-w-0 flex items-center gap-2 ${
                isSidebar ? 'px-3 py-1.5 text-xs' : 'px-3 py-2 text-sm'
              } ${indentPad} rounded-xl font-semibold transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E] ${
                activeSelf
                  ? 'bg-white/15 text-white font-bold border border-white/25 shadow-xs'
                  : activeWithin
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-white/85 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {group.icon && renderIcon(group.icon, iconClass(activeSelf || activeWithin))}
              <span className="truncate">{label}</span>
            </a>

            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={toggleActionLabel}
              title={toggleActionLabel}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]"
            >
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#E8772E]" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
              )}
            </button>
          </div>

          {isOpen && (
            <div
              id={panelId}
              className="space-y-0.5 ml-2 pl-2 border-l border-white/10 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {group.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Group without a separate landing page: single native <button aria-expanded>
    const isBodySection = group.id === 'group-comprendre-le-corps';
    const isNineAxes = group.id === 'group-9-axes';

    return (
      <div key={group.id} className={isBodySection ? 'pt-1.5' : ''}>
        <button
          type="button"
          onClick={() => toggleGroup(group.id)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={
            isBodySection
              ? 'flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.18em] text-[#E8772E] hover:bg-white/5 transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8772E]'
              : `${linkClass(activeWithin)} ${depth > 0 ? 'pl-4' : ''}`
          }
        >
          <span className="flex items-center gap-2 min-w-0 overflow-hidden text-left">
            {isNineAxes && (
              <span aria-hidden="true" className="text-[#8b949e] font-mono text-[10.5px] shrink-0">
                ├──
              </span>
            )}
            {!isNineAxes && group.icon && renderIcon(group.icon, isBodySection ? 'w-3 h-3 text-[#E8772E] shrink-0' : iconClass(activeWithin))}
            <span className={`truncate ${isNineAxes ? 'text-[11px]' : ''}`}>{label}</span>
          </span>

          <span className="flex items-center gap-1.5 shrink-0 ml-1">
            {group.locked && (
              <Lock aria-hidden="true" className="w-3 h-3 text-[#c9a84c]/80" />
            )}
            {isOpen ? (
              <ChevronDown
                aria-hidden="true"
                className={`w-3.5 h-3.5 ${isBodySection || isNineAxes ? 'text-[#E8772E]' : 'text-[#E8772E]'}`}
              />
            ) : (
              <ChevronRight
                aria-hidden="true"
                className={`w-3.5 h-3.5 ${isBodySection ? 'text-[#E8772E]/80' : 'text-white/60'}`}
              />
            )}
          </span>
        </button>

        {isOpen && (
          <div
            id={panelId}
            className={`space-y-0.5 mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150 ${
              isNineAxes
                ? 'pl-3 border-l-2 border-[#c9a84c]/30 ml-3'
                : !isBodySection
                ? 'ml-2 pl-2 border-l border-white/10'
                : ''
            }`}
          >
            {group.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderNode = (node: NavNode, depth = 0): React.ReactNode => {
    if (node.kind === 'group') {
      return renderGroup(node, depth);
    }
    return renderLeaf(node, depth);
  };

  return (
    <div className={isSidebar ? 'space-y-4' : 'space-y-4'}>
      {NAVIGATION_SECTIONS.map((section) => (
        <div
          key={section.id}
          role="region"
          aria-label={
            section.heading
              ? getText(section.heading, lang)
              : section.id === 'section-academie'
              ? getText({ fr: 'Académie', en: 'Academy', de: 'Akademie' }, lang)
              : getText({ fr: 'Accueil', en: 'Home', de: 'Startseite' }, lang)
          }
        >
          {section.heading && (
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E8772E] px-3 mb-1.5">
              <span className="truncate block">{getText(section.heading, lang)}</span>
            </div>
          )}
          <div className="space-y-0.5">
            {section.items.map((item) => renderNode(item, 0))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationMenuTree;
