import "./index.scss";

export default function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div className="component_progress-bar">
            <progress
                value={current}
                max={total}></progress>
            <p>
                {current} / {total}
            </p>
        </div>
    );
}
