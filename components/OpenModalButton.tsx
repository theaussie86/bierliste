"use client";

function OpenModalButton({ selector }: { selector: string }) {
  return (
    <span className="ml-4 flex-shrink-0">
      <button
        type="button"
        onClick={() => {
          const modal = document.querySelector<HTMLDialogElement>(selector);
          modal?.showModal();
        }}
        className="font-medium text-secondary hover:text-secondary/60"
      >
        Ändern
      </button>
    </span>
  );
}

export default OpenModalButton;
