


const Util = {
    intersects: function(one, two) {
        return ((one.xLeft >= two.xLeft && one.xLeft <= two.xRight ||
            one.xRight >= two.xLeft && one.xRight <= two.xRight) &&
            (one.yLeft >= two.yLeft && one.yLeft <= two.yRight ||
            one.yRight >= two.yLeft && one.yRight <= two.yRight)) ||
            ((two.xLeft >= one.xLeft && two.xLeft <= one.xRight ||
            two.xRight >= one.xLeft && two.xRight <= one.xRight) &&
            (two.yLeft >= one.yLeft && two.yLeft <= one.yRight ||
            two.yRight >= one.yLeft && two.yRight <= one.yRight));
    }
};

module.exports = Util;