import isoutils from "../src/index.js";
import { describe, it } from "node:test";
import * as assert from "node:assert";

describe("isoutils.removeUndefined", () => {
	it("should remove undefineds shallowly", () => {
		const obj = {
			prop1: "prop1",
			prop2: undefined,
			prop3: 2001
		};

		isoutils.removeUndefined(obj);

		assert.deepStrictEqual(obj, {
			prop1: "prop1",
			prop3: 2001
		});
	});
	it("should remove undefineds deeply", () => {

		const obj = {
			prop1: "prop1",
			prop2: {
				prop1: ["prop1"],
				prop2: undefined,
				prop3: "prop3"
			},
			prop3: 2001
		};

		isoutils.removeUndefined(obj, true);

		assert.deepStrictEqual(obj, {
			prop1: "prop1",
			prop2: {
				prop1: ["prop1"],
				prop3: "prop3"
			},
			prop3: 2001
		});
	});
});

describe("isoutils.removeNull", () => {
	it("should remove nulls shallowly", () => {
		const obj = {
			prop1: "prop1",
			prop2: null,
			prop3: 2001
		};

		isoutils.removeNull(obj);

		assert.deepStrictEqual(obj, {
			prop1: "prop1",
			prop3: 2001
		});
	});
	it("should remove nulls deeply", () => {
		const obj = {
			prop1: "prop1",
			prop2: {
				prop1: ["prop1"],
				prop2: null,
				prop3: "prop3"
			},
			prop3: 2001
		};

		isoutils.removeNull(obj, true);

		assert.deepStrictEqual(obj, {
			prop1: "prop1",
			prop2: {
				prop1: ["prop1"],
				prop3: "prop3"
			},
			prop3: 2001
		});
	});
});
