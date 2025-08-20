import React from 'react';
import algorithmInfo from '../algorithms/algorithmInfo.js';

// 改进的C++语法高亮函数
  const highlightCpp = (code) => {
    if (!code) return '';
    
    // C++关键字
    const keywords = [
      'int', 'float', 'double', 'char', 'bool', 'void', 'auto', 'const', 'static',
      'public', 'private', 'protected', 'class', 'struct', 'namespace', 'using',
      'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
      'continue', 'return', 'try', 'catch', 'throw', 'new', 'delete', 'sizeof',
      'typename', 'template', 'virtual', 'override', 'final', 'explicit', 'inline',
      'extern', 'volatile', 'register', 'typedef', 'union', 'enum', 'goto'
    ];
    
    // 常用类型
    const types = [
      'std::vector', 'std::string', 'std::map', 'std::set', 'std::unordered_map',
      'std::unordered_set', 'std::queue', 'std::stack', 'std::priority_queue',
      'std::deque', 'std::list', 'std::array', 'std::tuple', 'std::pair',
      'std::unique_ptr', 'std::shared_ptr', 'std::weak_ptr', 'std::function', 'std::optional',
      'std::variant', 'std::any', 'std::string_view', 'std::span'
    ];
    
    // 常用函数名
    const functions = [
      'main', 'cout', 'cin', 'cerr', 'clog', 'swap', 'max_element', 'min_element', 'shuffle',
      'sort', 'stable_sort', 'partial_sort', 'nth_element', 'reverse', 'rotate', 'unique',
      'find', 'find_if', 'find_if_not', 'count', 'count_if', 'accumulate', 'inner_product',
      'transform', 'for_each', 'copy', 'copy_if', 'move', 'fill', 'generate', 'replace',
      'remove', 'merge', 'inplace_merge', 'includes', 'set_union', 'set_intersection',
      'set_difference', 'set_symmetric_difference', 'push_heap', 'pop_heap', 'make_heap',
      'next_permutation', 'prev_permutation', 'random_shuffle', 'is_sorted', 'is_sorted_until',
      'equal', 'mismatch', 'lexicographical_compare', 'lower_bound', 'upper_bound', 'binary_search'
    ];
    
    // 首先转义HTML特殊字符
    let escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // 收集所有需要替换的位置和类型
    const replacements = [];
    let match;
    
    // 预处理器指令（包括#include后面的尖括号内容）
    const preprocessorRegex = /#(?:include\s+&lt;[^&gt;]*&gt;|include\s+"[^"]*"|define\s+\w+(?:\([^)]*\))?|ifdef\s+\w+|ifndef\s+\w+|endif|if\s+[^\n]+|elif\s+[^\n]+|else|pragma\s+[^\n]+|undef\s+\w+|line\s+\d+|error\s+[^\n]*)/gm;
    while ((match = preprocessorRegex.exec(escapedCode)) !== null) {
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'preprocessor',
        text: match[0]
      });
    }
    
    // 字符串
    const stringRegex = /"(?:[^"\\]|\\.)*"/g;
    while ((match = stringRegex.exec(escapedCode)) !== null) {
      const isOverlapped = replacements.some(r => 
        (match.index >= r.start && match.index < r.end) ||
        (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
      );
      if (!isOverlapped) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'string',
          text: match[0]
        });
      }
    }
    
    // 注释
    const commentRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm;
    while ((match = commentRegex.exec(escapedCode)) !== null) {
      const isOverlapped = replacements.some(r => 
        (match.index >= r.start && match.index < r.end) ||
        (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
      );
      if (!isOverlapped) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'comment',
          text: match[0]
        });
      }
    }
    
    // 类型
    types.forEach(type => {
      const escapedType = type.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const regex = new RegExp(`\\b${escapedType.replace(/\./g, '\\.')}\\b`, 'g');
      while ((match = regex.exec(escapedCode)) !== null) {
        const isOverlapped = replacements.some(r => 
          (match.index >= r.start && match.index < r.end) ||
          (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
        );
        if (!isOverlapped) {
          replacements.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'type',
            text: match[0]
          });
        }
      }
    });
    
    // 函数名
    functions.forEach(func => {
      const regex = new RegExp(`\\b${func}(?=\\s*\\()`, 'g');
      while ((match = regex.exec(escapedCode)) !== null) {
        const isOverlapped = replacements.some(r => 
          (match.index >= r.start && match.index < r.end) ||
          (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
        );
        if (!isOverlapped) {
          replacements.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'function',
            text: match[0]
          });
        }
      }
    });
    
    // 关键字
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      while ((match = regex.exec(escapedCode)) !== null) {
        const isOverlapped = replacements.some(r => 
          (match.index >= r.start && match.index < r.end) ||
          (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
        );
        if (!isOverlapped) {
          replacements.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'keyword',
            text: match[0]
          });
        }
      }
    });
    
    // 数字
    const numberRegex = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g;
    while ((match = numberRegex.exec(escapedCode)) !== null) {
      const isOverlapped = replacements.some(r => 
        (match.index >= r.start && match.index < r.end) ||
        (match.index + match[0].length > r.start && match.index + match[0].length <= r.end)
      );
      if (!isOverlapped) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'number',
          text: match[0]
        });
      }
    }
    
    // 按结束位置降序排序，避免替换位置偏移
    replacements.sort((a, b) => b.end - a.end);
    
    // 应用所有替换
    let result = escapedCode;
    replacements.forEach(replacement => {
      const before = result.substring(0, replacement.start);
      const after = result.substring(replacement.end);
      const highlighted = `<span class="${replacement.type}">${replacement.text}</span>`;
      result = before + highlighted + after;
    });
    
    return result;
  };

const AlgorithmDetailModal = ({ algorithm, onClose }) => {
  // 根据algorithm获取详细信息
  const info = algorithmInfo[algorithm];
  
  if (!info) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{info.chineseName} ({info.englishName})</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="info-section">
            <h3>算法描述</h3>
            <p>{info.description}</p>
          </div>
          
          <div className="info-section">
            <h3>工作原理</h3>
            <p>{info.principle}</p>
          </div>
          
          <div className="info-section">
            <h3>功能</h3>
            <p>{info.functionality}</p>
          </div>
          
          <div className="info-section">
            <h3>时空复杂度</h3>
            <p>时间复杂度: {info.timeComplexity}</p>
            <p>空间复杂度: {info.spaceComplexity}</p>
          </div>
          
          <div className="info-section">
            <h3>适用范围</h3>
            <p>{info.applicableRange}</p>
          </div>
          
          <div className="info-section">
            <h3>C++代码实现</h3>
            <pre className="pseudocode" dangerouslySetInnerHTML={{ __html: highlightCpp(info.pseudocode) }}></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetailModal;