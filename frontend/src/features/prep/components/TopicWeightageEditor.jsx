function TopicWeightageEditor({ topics, onTopicChange, onAddTopic, onRemoveTopic }) {
  const totalWeight = topics.reduce((sum, topic) => sum + Number(topic.weight || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Selected topics</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            totalWeight === 100
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          Total: {totalWeight}%
        </span>
      </div>

      {topics.map((topic, index) => (
        <div key={topic.id ?? index} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block">Topic name</span>
              <input
                type="text"
                value={topic.name}
                onChange={(event) => onTopicChange(index, 'name', event.target.value)}
                placeholder="e.g. React"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 block">Weightage (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={topic.weight}
                onChange={(event) => onTopicChange(index, 'weight', Number(event.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block">Confidence</span>
              <select
                value={topic.confidence}
                onChange={(event) => onTopicChange(index, 'confidence', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label className="block text-sm text-slate-700 md:col-span-2">
              <span className="mb-2 block">Subtopics</span>
              <input
                type="text"
                value={topic.subtopics}
                onChange={(event) => onTopicChange(index, 'subtopics', event.target.value)}
                placeholder="e.g. hooks, state management"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm text-slate-700">
            <span className="mb-2 block">Notes</span>
            <textarea
              value={topic.notes}
              onChange={(event) => onTopicChange(index, 'notes', event.target.value)}
              rows="2"
              placeholder="Optional notes for this topic"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onRemoveTopic(index)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Remove topic
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAddTopic}
        className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        + Add custom topic
      </button>
    </div>
  );
}

export default TopicWeightageEditor;
