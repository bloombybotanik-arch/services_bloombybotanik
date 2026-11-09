(function() {
  console.log('[EARLY-DIAG] Diagnostic classique démarré à', new Date().toISOString());

  function sanitizeUrl(raw) {
    if (!raw) return '';
    try {
      var u = new URL(raw, window.location.href);
      u.searchParams.delete('token');
      u.searchParams.delete('__aistudio_auth_token');
      return u.pathname + (u.search ? '?[query]' : '');
    } catch(e) {
      return String(raw).split('?')[0];
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function report(category, message, detail, meta) {
    var list = document.getElementById('bloom-early-diag-list');
    var container = document.getElementById('bloom-early-diag-panel');
    if (!container) {
      container = document.createElement('div');
      container.id = 'bloom-early-diag-panel';
      container.style.cssText = 'position:fixed;bottom:12px;right:12px;max-width:520px;max-height:280px;overflow-y:auto;background:rgba(15,25,20,0.96);color:#FAF7F2;border:1px solid #C5A059;border-radius:10px;padding:10px 14px;font-family:monospace;font-size:11px;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,0.6);line-height:1.4;';
      var header = document.createElement('div');
      header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;border-bottom:1px solid rgba(197,160,89,0.3);padding-bottom:4px;';
      header.innerHTML = '<span style="color:#C5A059;font-weight:bold;">🌿 Diagnostic Précoce (' + new Date().toLocaleTimeString() + ')</span><button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:#aaa;cursor:pointer;font-size:13px;">✕</button>';
      container.appendChild(header);
      list = document.createElement('div');
      list.id = 'bloom-early-diag-list';
      container.appendChild(list);
      document.body ? document.body.appendChild(container) : window.addEventListener('DOMContentLoaded', function() { document.body.appendChild(container); });
    }
    if (list) {
      var item = document.createElement('div');
      item.style.cssText = 'margin-top:6px;padding:6px 8px;background:rgba(255,255,255,0.06);border-radius:4px;border-left:3px solid #ff8080;';
      var metaStr = '';
      if (meta && Object.keys(meta).length > 0) {
        var parts = [];
        if (meta.src) parts.push('src=' + escapeHtml(sanitizeUrl(meta.src)));
        if (meta.loc) parts.push('loc=' + escapeHtml(meta.loc));
        if (meta.tag) parts.push('tag=&lt;' + escapeHtml(meta.tag) + '&gt;');
        if (parts.length > 0) {
          metaStr = '<div style="font-size:10px;color:#88d0ff;margin-top:2px;">' + parts.join(' | ') + '</div>';
        }
      }
      item.innerHTML = '<strong style="color:#ff8080;">[' + escapeHtml(category) + ']</strong> ' + escapeHtml(message || 'Erreur') +
        metaStr +
        (detail ? '<pre style="margin:4px 0 0;font-size:10px;color:#ffb4b4;white-space:pre-wrap;max-height:120px;overflow-y:auto;">' + escapeHtml(detail) + '</pre>' : '');
      list.appendChild(item);
    }
  }

  window.__reportEarlyDiag = report;

  // Initial confirmation
  var badge = document.getElementById('bloom-boot-badge');
  if (badge) {
    badge.textContent = '🔍 Diagnostic classique actif';
  }

  // 1. Resource errors (capture phase)
  window.addEventListener('error', function(e) {
    var target = e.target || e.srcElement;
    if (target && target !== window && (target.tagName === 'SCRIPT' || target.tagName === 'LINK' || target.tagName === 'IMG')) {
      var src = target.src || target.href || '';
      // Ignore favicon or optional icon misses
      if (src && (src.includes('favicon') || src.includes('apple-touch-icon'))) {
        return;
      }
      console.warn('[EarlyDiag Resource]', target.tagName, src);
      report('Ressource', 'Échec de chargement élément <' + target.tagName + '>', '', {
        tag: target.tagName,
        src: src
      });
      return;
    }

    // 2. JS Exceptions
    if (e.message) {
      console.error('[EarlyDiag Exception]', e.message, e.filename, e.lineno);
      report('Exception JS', e.message, e.error && e.error.stack ? e.error.stack : '', {
        loc: (e.filename ? sanitizeUrl(e.filename) : '') + (e.lineno ? ':' + e.lineno + (e.colno ? ':' + e.colno : '') : '')
      });
    }
  }, true);

  // 3. Unhandled promise rejections
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason;
    var msg = (reason && (reason.message || reason)) || 'Promesse rejetée';
    var stack = reason && reason.stack ? reason.stack : '';
    console.error('[EarlyDiag Rejection]', reason);
    report('Promesse', String(msg), stack, {});
  });
})();
